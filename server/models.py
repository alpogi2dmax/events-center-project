from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, datetime

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    full_name = db.Column(db.String)
    profile_pic = db.Column(db.String)
    address = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)

    #Add relationships
    purchases = db.Relationship(
        'Purchase', back_populates='user', cascade='all, delete-orphan')
    
    # Add serialization rules
    serialize_rules = ('-purchases.user',)

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    venue = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    date = db.Column(db.DateTime)
    price = db.Column(db.Float)
    
    #Add relationships
    purchases = db.Relationship(
        'Purchase', back_populates='event', cascade='all, delete-orphan')
    
    # Add serialization rules
    serialize_rules = ('-purchases.event',)

class Purchase(db.Model, SerializerMixin):
    __tablename__ = 'purchases'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    number_tickets = db.Column(db.Integer)

    #Add relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    user = db.Relationship('User', back_populates='purchases')
    event = db.Relationship('Event', back_populates='purchases')

    # Add serialization rules
    serialize_rules = ('-user.purchases', '-event.purchases',)

