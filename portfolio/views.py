from django.shortcuts import render

def index(request):
    template = 'index.html'
    current_user = ''

    if request.user.is_authenticated():
        current_user = request.user.get_full_name()
        name,domain = current_user.split('@')

    context = {
        'username': name
    }

    return render(request, template, context)
