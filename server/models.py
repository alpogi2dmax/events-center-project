from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, datetime, bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)
    full_name = db.Column(db.String)
    profile_pic = db.Column(db.String)
    address = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    # Add relationships
    purchases = db.relationship(
        'Purchase', back_populates='user', cascade='all, delete-orphan')
    
    events = association_proxy('purchases', 'event',
                               creator=lambda event_obj: Purchase(event=event_obj))

    
    def to_dict(self):
        user_dict = super().to_dict()

        unique_events = {event for event in self.events}
        user_dict['events'] = [event.to_dict() for event in unique_events]

        return user_dict
    
    
    
    # Add serialization rules
    serialize_rules = ('-purchases.user',)


    # add validation
    @validates('username')
    def validate_username(self, key, username):
        if len(username) < 3 or len(username) > 15:
            raise ValueError('Name must be between 3 and 15 characters')
        return username
    
    @validates('password')
    def validate_password(self, key, password):
        if len(password) < 3 or len(password) > 15:
            raise ValueError('Name must be between 3 and 15 characters')
        return password


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
    purchases = db.relationship(
        'Purchase', back_populates='event', cascade='all, delete-orphan')
    
    users = association_proxy('purchases', 'user',
                               creator=lambda user_obj: Purchase(user=user_obj))
    
    # Add serialization rules
    serialize_rules = ('-purchases.event',)

class Purchase(db.Model, SerializerMixin):
    __tablename__ = 'purchases'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    number_tickets = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    #Add relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))

    user = db.relationship('User', back_populates='purchases')
    event = db.relationship('Event', back_populates='purchases')

    # Add serialization rules
    serialize_rules = ('-user.purchases', '-event.purchases',)



