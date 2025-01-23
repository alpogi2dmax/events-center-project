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
        user1 = User(
            username='lebronjames',
            full_name='Lebron James',
            profile_pic='./images/lebronjames.png',
            address='9955 W Beverly Grove Dr',
            city='Beverly Hills',
            state='CA'
            )
        user1.password_hash = 'p@ssw0rd'
        users.append(user1)
        user2 = User(
            username='conanobrien',
            full_name='Conan OBrien',
            profile_pic='./images/conanobrien.png',
            address='1253 Amalfi Dr',
            city='Los Angeles',
            state='CA'
            )
        user2.password_hash = 'p@ssw0rd'
        users.append(user2)
        user3 = User(
            username='tomcruise',
            full_name='Tom Cruise',
            profile_pic='./images/tomcruise.png',
            address='1111 Calle Vista Dr',
            city='Beverly Hills',
            state='CA'
            )
        user3.password_hash = 'p@ssw0rd'
        users.append(user3)
        user4 = User(
            username='billgates',
            full_name='Bill Gates',
            profile_pic='./images/billgates.png',
            address='1111 Calle Vista Dr',
            city='1835 73rd Ave NE',
            state='WA'
            )
        user4.password_hash = 'p@ssw0rd'
        users.append(user4)

        print('Seeding events...')
        events = []
        events.append(Event(name = 'Mary J Blige', image = './images/maryjblige.png', venue = 'Intuit Dome', city = 'Inglewood', state = 'CA', date = datetime.strptime('03/01/2025', '%m/%d/%Y'), price = 123))
        events.append(Event(name = 'J Balvin', image = './images/jbalvin.png', venue = 'Kia Forum', city = 'Inglewood', state = 'CA', date = datetime.strptime('05/09/2025', '%m/%d/%Y'), price = 123))
        events.append(Event(name = 'Heart', image = './images/heart.png', venue = 'Golden 1 Center', city = 'Sacramento', state = 'CA', date = datetime.strptime('03/04/2025', '%m/%d/%Y'), price = 42))
        events.append(Event(name = 'AC/DC', image = './images/acdc.png', venue = 'Rose Bowl', city = 'Pasadena', state = 'CA', date = datetime.strptime('04/18/2025', '%m/%d/%Y'), price = 129))
        events.append(Event(name = 'Dua Lipa', image = './images/dualipa.png', venue = 'United Center', city = 'Chicago', state = 'IL', date = datetime.strptime('09/05/2025', '%m/%d/%Y'), price = 207))
        events.append(Event(name = 'Kendrick Lamar', image = './images/kendricklamar.png', venue = 'NRG Stadium', city = 'Houston', state = 'TX', date = datetime.strptime('04/23/2025', '%m/%d/%Y'), price = 182))
        events.append(Event(name = 'Metallica', image = './images/metallica.png', venue = 'Raymond James Stadium', city = 'Tampa', state = 'FL', date = datetime.strptime('06/06/2025', '%m/%d/%Y'), price = 52))
        events.append(Event(name = 'Post Malone', image = './images/postmalone.png', venue = 'Allegiant Stadium', city = 'Las Vegas', state = 'NV', date = datetime.strptime('05/03/2025', '%m/%d/%Y'), price = 91))
        events.append(Event(name = 'Tyler the Creator', image = './images/tylerthecreator.png', venue = 'Crypto.com Arena', city = 'Los Angeles', state = 'CA', date = datetime.strptime('02/15/2025', '%m/%d/%Y'), price = 182))
        events.append(Event(name = 'Charli XCX', image = './images/charlixcx.png', venue = 'Barclays Center', city = 'Brooklyn', state = 'NY', date = datetime.strptime('05/04/2025', '%m/%d/%Y'), price = 207))

        print('Seeding purchases...')
        purchases = []
        purchases.append(Purchase(name = 'lebron_mary', number_tickets = 2, user_id = 1, event_id = 1))
        purchases.append(Purchase(name = 'lebron_mary', number_tickets = 3, user_id = 1, event_id = 1))
        purchases.append(Purchase(name = 'conan_mary', number_tickets = 3, user_id = 2, event_id = 1))
        db.session.add_all(users)
        db.session.add_all(events)
        db.session.add_all(purchases)
        db.session.commit()

        print('Seeding done!')



        
