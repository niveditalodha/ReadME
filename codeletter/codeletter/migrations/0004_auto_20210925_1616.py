# Generated by Django 3.2.7 on 2021-09-25 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("codeletter", "0003_auto_20210925_1552"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="userpreference",
            name="concept_id",
        ),
        migrations.AddField(
            model_name="userpreference",
            name="concept_ids",
            field=models.CharField(max_length=100, null=True),
        ),
    ]
