# Generated by Django 3.2.7 on 2021-09-25 21:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('codeletter', '0004_auto_20210925_1616'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userpreference',
            old_name='username',
            new_name='user_id',
        ),
    ]
