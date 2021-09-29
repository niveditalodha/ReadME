[![DOI](https://zenodo.org/badge/295188611.svg)](https://zenodo.org/badge/latestdoi/295188611)

[![Build Status](https://travis-ci.org/bsharathramesh/SE_Project1.svg?branch=master)](https://travis-ci.org/bsharathramesh/SE_Project1)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# ReadMe
ReadMe is a web application that gathers articles from the internet and recommends them to users depending on their likes.
- User can connect to the applications and select choices such as Machine Learning, Programming, Data Science, and Dev Ops etc. So that only the articles from those areas are shown to the user.
- Every day, an article is sent to the user's email address based on their choices.
- The user can search for an article from a pool of articles or use filters to find articles from a specific domain.
- As a mark of thanks, enthusiastic readers are granted a User Badge.

Below are the techonologies that we have used to build the application.
- Python3
- Django
- django-crontab
- Angular


## Installation Steps 
1. Run `pip install -r requirements.txt`
2. Create a virtualenv named env and activate the env
	```
	virtualenv venv 
	s0urce venv/scripts/activate 
	```
3. Run Migration commands to create tables in the database
	```
	python manage.py makemigrations 
	python manage.py migrate
	python manage.py createsuperuser
	
	```
	Create the login credentials when prompted and don't forget to save this, because the same credentials are used to login to the admin console 

## Execution Steps 

4. Run `python3 manage.py runserver` at `file path`. 
5. Next, open the browser and enter, [https://localhost:4200/](localhost:4200/) to open the Web UI of the application.


## Web UI

All the UI Images


## FUTURE SCOPE

- Allows users to choose a topic, and articles from that topic are sent to them every day in such a way that each article is related to the one before it. This allows the individual to master that particular area.
- List of research conferences happening.
- Expand the number of domains/areas; right now, we're just showing articles from a few, but there's obviously room for more.




## Team Members

- Nivedita Lodha
- Uma
- Sai Naga Vamshi Chidara
- Neha
- Akhil Kumar Mengani
				

