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




if __name__ == '__main__':
    app.run(port=5555, debug=True)