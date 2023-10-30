const popup = document.getElementById('popup');
const popupForm = document.getElementById('signUpForm');
const botLink = document.getElementById('bot-link');
const elem = document.querySelector('#text__form');
const link = document.querySelector('.link__submit');
const  heading = document.querySelector('.text__submit');

function checkSighUp() {
    if ( localStorage.getItem('signedUp') ) {
        // botLink.style.display = 'block';
        link.style.display = "block";
        heading.style.display = "block"; 
        elem.classList.add('hidden');
        popupForm.classList.add('hidden');
    }
}

checkSighUp();


document.querySelectorAll('.open-signup-popup').forEach(btn => { 
    btn.addEventListener('click', () => { 
        popup.classList.add('opened');
        document.body.classList.add('with-popup');
    });
});

popup.querySelector('.close-popup').addEventListener('click', (e) => { 
    popup.classList.remove('opened');

    document.body.classList.remove('with-popup');
});

const handleSubmit = async function (e) {
    e.preventDefault();

    const userForm = new FormData(popupForm);

    await fetch('https://ruvemaximus1.fvds.ru/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userForm.get('name'),
            email: userForm.get('email'),
            phone: userForm.get('phone'),
            comment: userForm.get('comment')
        })
    })
    .then(response => {
        response.json()
            .then(data => {
                localStorage.setItem('signedUp', true);
                // botLink.style.display = 'block';
                link.style.display = "block";
                heading.style.display = "block"; 
                elem.classList.add('hidden');
                popupForm.classList.add('hidden');
                console.log(data);
            });
    })
    .catch(error => {
        console.log(error);
    });

    return false;
}

popupForm.addEventListener('submit', handleSubmit);
