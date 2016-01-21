from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=66)
    email = forms.EmailField()
    message = forms.CharField(max_length=140, strip=True, widget=forms.Textarea(attrs={'class':'dont_resize'}))
