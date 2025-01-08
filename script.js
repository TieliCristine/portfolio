// Selecionar links do menu e o container principal
const navLinks = document.querySelectorAll('nav a');
const container = document.getElementById('content');

// Função para carregar conteúdo, CSS e JS de uma seção
function loadSection(section) {
    // Remove o conteúdo atual com uma transição suave
    container.classList.remove('visible');

    // Aguarda a transição para iniciar o carregamento
    setTimeout(() => {
        // Carregar o HTML da seção
        fetch(`sections/${section}/${section}.html`)
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar o conteúdo.');
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;

                // Carregar o CSS específico
                const oldCss = document.querySelector(`#section-css`);
                if (oldCss) oldCss.remove();

                const newCss = document.createElement('link');
                newCss.id = 'section-css';
                newCss.rel = 'stylesheet';
                newCss.href = `sections/${section}/${section}.css`;
                document.head.appendChild(newCss);

                // Carregar o JS específico
                const oldScript = document.querySelector(`#section-script`);
                if (oldScript) oldScript.remove();

                const newScript = document.createElement('script');
                newScript.id = 'section-script';
                newScript.src = `sections/${section}/${section}.js`;
                document.body.appendChild(newScript);

                // Tornar o conteúdo visível novamente
                setTimeout(() => container.classList.add('visible'), 10);
            })
            .catch(error => {
                container.innerHTML = `<p>Erro ao carregar a seção: ${error.message}</p>`;
            });
    }, 500); // Tempo correspondente à transição
}

// Adicionar eventos aos links do menu
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const section = link.getAttribute('href').replace('#', '');
        loadSection(section);
    });
});

// Carregar a seção inicial
loadSection('about');
