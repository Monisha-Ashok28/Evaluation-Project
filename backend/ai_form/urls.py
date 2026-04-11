from django.urls import path
from .views import form_assistant

urlpatterns = [
    path('suggest/', form_assistant),
]
