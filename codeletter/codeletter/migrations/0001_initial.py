# Generated by Django 3.2.7 on 2021-09-25 19:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Article",
            fields=[
                (
                    "article_id",
                    models.CharField(max_length=10, primary_key=True, serialize=False),
                ),
                ("title", models.CharField(max_length=100)),
                ("abstract", models.CharField(max_length=100)),
                ("url", models.CharField(max_length=100)),
                ("domain", models.CharField(max_length=100)),
                ("doi", models.CharField(blank=True, max_length=100, null=True)),
                ("image", models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Concept",
            fields=[
                (
                    "concept_id",
                    models.CharField(max_length=10, primary_key=True, serialize=False),
                ),
                ("concept_name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="UserPreference",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "concept_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="codeletter.concept",
                    ),
                ),
                (
                    "username",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="UserBadge",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "user_badge",
                    models.CharField(
                        choices=[
                            ("Beginner", "Beginner"),
                            ("Intermediate", "Intermediate"),
                            ("Expert", "Expert"),
                        ],
                        default="Beginner",
                        max_length=50,
                    ),
                ),
                (
                    "concept_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="codeletter.concept",
                    ),
                ),
                (
                    "username",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="SentArticle",
            fields=[
                (
                    "sent_article_id",
                    models.AutoField(primary_key=True, serialize=False),
                ),
                ("sent_date", models.DateTimeField(auto_now_add=True)),
                ("read_flag", models.BooleanField(default=False)),
                (
                    "article_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="codeletter.article",
                    ),
                ),
                (
                    "concept_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="codeletter.concept",
                    ),
                ),
                (
                    "username",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="article",
            name="concept",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="codeletter.concept"
            ),
        ),
    ]
