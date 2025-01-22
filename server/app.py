#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User,Event, Purchase


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):

    def get(self):

        users = [users.to_dict() for users in User.query.all()]
        return make_response(users, 200)
    
    def post(self):
        try:
            data = request.get_json()
            user = User(
                username = data['username'],
                password = data['password'],
                full_name = data['full_name'],
                profile_pic =data['profile_pic'],
                address = data['address'],
                city = data['city'],
                state = data['state']
            )
            db.session.add(user)
            db.session.commit()
            user_dict = user.to_dict()
            return make_response(user_dict, 201)
        except:
            response_body = {'errors': ['validation errors']}
            return make_response(response_body, 400)
    
api.add_resource(Users, '/users')

class UsersByID(Resource):

    def get(self, id):

        user = User.query.filter_by(id=id).first()
        if user:
            user_dict = user.to_dict()
            return make_response(user_dict, 200)
        else:
            response_body = {'error': 'User not found'}
            return make_response(response_body, 404)
        
    def patch(self, id):

        user = User.query.filter_by(id=id).first()
        data = request.get_json()

        if len(data.get('username')) < 3 or len(data.get('username')) > 15:
            raise ValueError('Username must be between 3 and 15 characters')
        if len(data.get('password')) < 3 or len(data.get('password')) > 15:
            raise ValueError('Password must be between 3 and 15 characters')
        if user:
            for attr, value, in data.items():
                setattr(user, attr, value)

            db.session.add(user)
            db.session.commit()

            user_dict = user.to_dict()
            return make_response(user_dict, 202)
        else:
            return make_response({'error': 'User not found'})
    
    def delete(self, id):

        user = User.query.filter_by(id=id).first()

        if user:
            db.session.delete(user)
            db.session.commit()
            response_body = ''
            return make_response(response_body, 204)
        else:
            response_body = {'error': 'Purchase not found'}
            return make_response(response_body, 404)
        
    

api.add_resource(UsersByID, '/users/<int:id>')

class Events(Resource):

    def get(self):

        events = [events.to_dict() for events in Event.query.order_by(Event.date).all()]
        return make_response(events, 200) 
    
    def post(self):
        try:
            data = request.get_json()
            event = Event(
                name = data['name'],
                image = data['image'],
                venue = data['venue'],
                city = data['city'],
                state = data['state'],
                price = data['price']
            )
            db.session.add(event)
            db.session.commit()
            event_dict = event.to_dict()
            return make_response(event_dict, 201)
        except:
            response_body = {'errors': ['validation errors']}
            return make_response(response_body, 400)
    
api.add_resource(Events, '/events')

class EventsByID(Resource):

    def get(self, id):

        event = Event.query.filter_by(id=id).first()
        if event:
            event_dict = event.to_dict()
            return make_response(event_dict, 200)
        else:
            response_body = {'error': 'Event not found'}
            return make_response(response_body, 200)
        
api.add_resource(EventsByID, '/events/<int:id>')

class Purchases(Resource):

    def get(self):

        purchases = [purchase.to_dict() for purchase in Purchase.query.all()]
        return make_response(purchases, 200)

    def post(self):

        try:
            data = request.get_json()

            new_purchase = Purchase(
                name = data['name'],
                number_tickets = data['number_tickets'],
                user_id = data['user_id'],
                event_id = data['event_id']
            )

            db.session.add(new_purchase)
            db.session.commit()
            new_purchase_dict = new_purchase.to_dict()
            return make_response(new_purchase_dict, 201)
        except:
            response_body = {'errors': ['validation errors']}
            return make_response(response_body, 400)

api.add_resource(Purchases, '/purchases')

class PurchasesByID(Resource):

    def delete(self, id):

        purchase = Purchase.query.filter_by(id=id).first()

        if purchase:
            db.session.delete(purchase)
            db.session.commit()
            response_body = ''
            return make_response(response_body, 204)
        else:
            response_body = {'error': 'Purchase not found'}
            return make_response(response_body, 404)

api.add_resource(PurchasesByID, '/purchases/<int:id>')

class SignUp(Resource):

    def post(self):
        try:
            data = request.get_json()
            user = User(
                username = data['username'],
                password = data['password'],
                full_name = data['full_name'],
                profile_pic =data['profile_pic'],
                address = data['address'],
                city = data['city'],
                state = data['state']
            )
            db.session.add(user)
            db.session.commit()
            user_dict = user.to_dict()
            return make_response(user_dict, 201)
        except:
            response_body = {'errors': ['validation errors']}
            return make_response(response_body, 400)

api.add_resource(SignUp, '/signup')

class CheckSession(Resource):

    def get(self):

        user_id = session.get('user_id')
        # breakpoint()
        # return make_response('I am in check session')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            
            for event in user.events:
                adjusted_purchases = [purchase for purchase in event.purchases if purchase.user_id == user.id]
                event.purchases = adjusted_purchases
            user_dict = user.to_dict()
            # return make_response('I am in check session')
            return jsonify(user_dict, 200)
        return {}, 204

api.add_resource(CheckSession, '/checksession')

class Login(Resource):

    def post(self):

        username = request.get_json().get('username')
        user = User.query.filter(User.username == username).first()

        password = request.get_json()['password']

        if password == user.password:
            session['user_id'] = user.id
            user_dict = user.to_dict()
            return make_response(user_dict, 200)
        else:
            response_body = {'error': 'Invalid username and password'}
            return make_response(response_body, 401)
        
api.add_resource(Login, '/login')
        
class Logout(Resource):

    def delete(self):

        session['user_id'] = None
        return {}, 204

api.add_resource(Logout, '/logout') 




if __name__ == '__main__':
    app.run(port=5555, debug=True)