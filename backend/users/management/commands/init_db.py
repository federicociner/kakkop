import logging
from random import randint

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from faker import Faker

LOGGER = logging.getLogger(__file__)

User = get_user_model()
fake = Faker()
Faker.seed(randint(0, 99999))


class Command(BaseCommand):
    args = ""
    help = "Create a set of pre-defined users for testing."

    def _create_users(self):
        superuser, created = User.objects.get_or_create(email="admin@test.com",)

        if not created:
            superuser.first_name = fake.first_name()
            superuser.last_name = fake.last_name()
            superuser.set_password("password123")
            superuser.is_staff = True
            superuser.is_superuser = True
            superuser.save()

        users = [
            {"email": "user1@test.com", "password": "testing123"},
            {"email": "user2@test.com", "password": "testing1234"},
            {"email": "user3@test.com", "password": "testing12345"},
        ]

        for user in users:
            u, _ = User.objects.get_or_create(email=user.get("email"))
            u.first_name = fake.first_name()
            u.last_name = fake.last_name()
            u.set_password(user.get("password"))
            u.save()

        LOGGER.info("Successfully created test users.")

    def handle(self, *args, **options):
        self._create_users()
