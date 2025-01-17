#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
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

api.add_resource(UsersByID, '/users/<int:id>')

class Events(Resource):

    def get(self):

        events = [events.to_dict() for events in Event.query.all()]
        return make_response(events, 200) 
    
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
            return make_response(new_purchase_dict, 200)
        except:
            response_body = {'errors': ['validation errors']}
            return make_response(response_body, 400)

api.add_resource(Purchases, '/purchases')





if __name__ == '__main__':
    app.run(port=5555, debug=True)