# Generated by Django 3.2.7 on 2021-09-25 21:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("codeletter", "0005_rename_username_userpreference_user_id"),
    ]

    operations = [
        migrations.RenameField(
            model_name="sentarticle",
            old_name="username",
            new_name="user_id",
        ),
        migrations.RenameField(
            model_name="userbadge",
            old_name="username",
            new_name="user_id",
        ),
    ]
