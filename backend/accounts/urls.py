from django.urls import path
from .views import login_view
from .views import login_view, dashboard_view

urlpatterns = [
    path('login/', login_view),
    path('dashboard/', dashboard_view),
]