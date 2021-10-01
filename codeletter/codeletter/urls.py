"""
    codeletter URL Configuration

    The `urlpatterns` list routes URLs to views. For more information please see: https://docs.djangoproject.com/en/3.1/topics/http/urls/
    Examples:
    Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
    Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
    Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.Login.as_view(), name = 'login'),
    path('get-random-articles/', views.GetRandomArticles.as_view(), name='get-random-articles'),
    path('get-sent-articles/', views.GetSentArticles.as_view(), name='get-sent-articles'),
    path('update-read-flag/', views.UpdateReadFlag.as_view(), name='update-read-flag'),
    path('get-preferences/', views.GetPreferences.as_view(), name='get-preferences'),
    path('update-preferences/', views.UpdatePreferences.as_view(), name='update-preferences'),
    path('get-concept-badges/', views.GetConceptBadges.as_view(), name='get-concept-badges')
]
