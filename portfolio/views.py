from django.shortcuts import render

def index(request):
    template = 'index.html'
    current_user = ''

    python_queryset = ['Django REST Framework', 'Knowledgable with Python STD library', 'Custom Authentication/Authorization', '3rd party libraries e.g Virtualenv, Virtualenvwrapper, crispy_forms, django-registration-redux etc.',]

    ui_queryset = ['HTML5/CSS3 ', 'Bootstrap 3+', 'Javascript and libraries e.g AngularJS and Jquery', 'Font-icons and 3rd party iconic fonts e.g FontAwesome', '2-Way data binding and loose coupling with AngularJS']

    osx_queryset = ['Intermediate knowledge of Ubuntu Linux/BASH', 'SSH VirtualBox and Vagrant', 'Postgresql/MySQL/sqlite3', 'Version control with Git', 'VIM!']

    if request.user.is_authenticated():
        current_user = request.user.get_full_name()
        name,domain = current_user.split('@')

    context = {
        'username': name,
        'py_query': python_queryset,
        'ui_query': ui_queryset,
        'osx_query': osx_queryset
    }

    return render(request, template, context)
