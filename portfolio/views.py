from django.shortcuts import render

def index(request):
    template = 'index.html'
    current_user = ''

    python_queryset = ['Django REST Framework', 'Familiarity with STD library', 'Custom Authentication/Authorization', '3rd party libraries e.g Virtualenv, Virtualenvwrapper, crispy_forms, django-registration-redux etc.',]

    if request.user.is_authenticated():
        current_user = request.user.get_full_name()
        name,domain = current_user.split('@')

    context = {
        'username': name,
        'py_query': python_queryset
    }

    return render(request, template, context)
