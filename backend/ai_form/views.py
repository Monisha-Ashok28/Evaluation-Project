from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def form_assistant(request):
    name = request.data.get("name", "")
    email = request.data.get("email", "")
    message = request.data.get("message", "")

    suggestions = []

    # Name suggestion
    if name and not name[0].isupper():
        suggestions.append(f"Name should start with a capital letter: {name.capitalize()}")

    # Email suggestion
    if "@" not in email or "." not in email:
        suggestions.append("Enter a valid email like example@gmail.com")

    # Message suggestion
    if len(message) < 10:
        suggestions.append("Message should be at least 10 characters long")

    if not suggestions:
        suggestions.append("Your input looks good!")

    return Response({
        "suggestions": suggestions
    })
