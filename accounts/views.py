from django.shortcuts import render
# Create your views here.

def index(request):
    template = 'index.html'
    current_user = ''

    if request.user.is_authenticated():
        current_user = request.user.__str__

    context = {
        'user': current_user
    }

    return render(request, template, context)
