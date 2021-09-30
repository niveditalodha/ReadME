from django.db import models
from django.contrib.auth.models import User


class Concept(models.Model):
    """
    :Concept Class: Stores all the domains available in the application
    :Attributes:
    :concept_id: Primary Key of the model
    :concept_name: Name of the domain
    """

    concept_id = models.IntegerField(max_length=10, primary_key=True)
    concept_name = models.CharField(max_length=100)


class UserPreference(models.Model):
    """
    :Concept Class: stores all the domains available in the application
    :Attributes:
    :user_id: primary key of the table
    :concept_ids: the areas in which the user is interested in.
    """

    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    concept_ids = models.CharField(max_length=100, null=True)


class Article(models.Model):
    """
    :Article Class: stores all the articles collected from the internet
    :Attributes:
    :article_id: primary key of the table
    :title: name of the title
    :abstract: small description about the content of the article
    :url: http url of the article
    :domain: the domain from which the article is collected
    :concept_ids: each articles belongs to an area, this is a list of concept ids the article is mapped to
    :doi: digital object identifier for the article
    :image: image for the article
    """

    article_id = models.IntegerField(max_length=10, primary_key=True)
    title = models.CharField(max_length=100)
    abstract = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    domain = models.CharField(max_length=100)
    concept_ids = models.CharField(max_length=100, null=True)
    doi = models.CharField(max_length=100, null=True, blank=True)
    image = models.CharField(max_length=100, null=True, blank=True)


class SentArticle(models.Model):
    """
    :SentArticle Class: this table stores all the articles sent to the user
    :Attributes:
    :sent_article_id: primary key of the table
    :user_id: Name of the domain
    :article_id: foreign key of the articles table
    :sent_date: the date on which the article is sent
    :concept_ids: the mapping of current article to the concepts
    :read_flag: flag to denote if the article is read by the user
    """

    sent_article_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    article_id = models.ForeignKey(Article, on_delete=models.CASCADE)
    sent_date = models.DateTimeField(auto_now_add=True)
    concept_ids = models.CharField(max_length=100, null=True)
    read_flag = models.BooleanField(default=False)


class UserBadge(models.Model):
    """
    :UserBadge Class: Stores all the domains available in the application
    :Attributes:
    :user_id: primary key of the model
    :concept_id: foreign key for the concepts table
    :user_badge: badge given to the user
    """

    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    concept_id = models.ForeignKey(Concept, on_delete=models.CASCADE)
    user_badge = models.CharField(
        max_length=50,
        choices=[
            ("Beginner", "Beginner"),
            ("Intermediate", "Intermediate"),
            ("Expert", "Expert"),
        ],
        default="Beginner",
    )
