// script.js

document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentItem = 0;

    function showItem(index) {
        carouselItems.forEach(function(item) {
            item.style.display = 'none';
        });
        carouselItems[index].style.display = 'block';
    }

    function nextItem() {
        currentItem++;
        if (currentItem >= carouselItems.length) {
            currentItem = 0;
        }
        showItem(currentItem);
    }

    setInterval(nextItem, 3000);

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        alert(`Nome: ${name}\nE-mail: ${email}\nMensagem: ${message}`);
        contactForm.reset();
    });

    // Função para carregar informações do canal do YouTube
    function loadChannelInfo() {
        const channelUrl = 'https://www.youtube.com/@klotes9067';
        const apiKey = 'AIzaSyDeKEQUTDGzmja1uDP9XuBNAs4HXgJwznI'; // Substitua pelo seu próprio API Key do YouTube

        const channelInfoUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${getChannelId(channelUrl)}&key=${apiKey}`;

        // Faz uma solicitação AJAX para a API do YouTube para obter as informações do canal
        fetch(channelInfoUrl)
            .then(response => response.json())
            .then(data => {
                const channelTitle = data.items[0].snippet.title;
                const channelDescription = data.items[0].snippet.description;

                // Atualiza os elementos HTML com as informações do canal
                document.querySelector('header h1').textContent = channelTitle;
                document.querySelector('#sobre p').textContent = channelDescription;
            })
            .catch(error => {
                console.error('Erro ao obter informações do canal:', error);
            });
    }

    // Função auxiliar para extrair o ID do canal a partir da URL do canal do YouTube
    function getChannelId(channelUrl) {
        const regex = /\/([^/]+)\/?$/;
        const match = channelUrl.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    loadChannelInfo();
});
