#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc


# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Event, Purchase, datetime

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        db.create_all()

        print("Starting seed...")
        # Seed code goes here!

        print("Clearing db...")
        User.query.delete()
        Event.query.delete()
        Purchase.query.delete()

        print('Seeding users...')
        users = []
        users.append(User(username = 'lebronjames', password = 'p@ssw0rd', full_name = 'Lebron James', profile_pic = 'image', address = '9955 W Beverly Grove Dr', city = 'Beverly Hills', state = 'CA'))
        users.append(User(username = 'conanobrien', password = 'p@ssw0rd', full_name = 'Conan OBrien', profile_pic = 'image', address = '1253 Amalfi Dr', city = 'Los Angeles', state = 'CA'))

        print('Seeding events...')
        events = []
        events.append(Event(name = 'Mary J Blige', image = 'image', venue = 'Intuit Dome', city = 'Inglewood', state = 'CA', date = datetime.strptime('03/01/2025', '%m/%d/%Y'), price = 123))
        events.append(Event(name = 'J Balvin', image = 'image', venue = 'Kia Forum', city = 'Inglewood', state = 'CA', date = datetime.strptime('05/09/2025', '%m/%d/%Y'), price = 123))

        print('Seeding purchases...')
        purchases = []
        purchases.append(Purchase(name = 'lebron_mary', number_tickets = 2, user_id = 1, event_id = 1))
        purchases.append(Purchase(name = 'conan_mary', number_tickets = 3, user_id = 2, event_id = 1))
        db.session.add_all(users)
        db.session.add_all(events)
        db.session.add_all(purchases)
        db.session.commit()

        print('Seeding done!')



        
