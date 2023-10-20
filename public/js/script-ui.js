const tab1Button = document.getElementById('tabs1');
const tab2Button = document.getElementById('tabs2');
const tab1Content = document.getElementById('tabs_content_1');
const tab2Content = document.getElementById('tabs_content_2');

tab1Button.addEventListener('click', () => {
    tab1Content.classList.remove('hidden');
    tab2Content.classList.add('hidden');
    tab1Button.classList.add('bg-gray-300', 'text-gray-800');
    tab1Button.classList.remove('bg-none', 'text-gray-500');
    tab2Button.classList.add('bg-none', 'text-gray-500');
    tab2Button.classList.remove('bg-gray-300', 'text-gray-800');
});

tab2Button.addEventListener('click', () => {
    tab1Content.classList.add('hidden');
    tab2Content.classList.remove('hidden');
    tab1Button.classList.remove('bg-gray-300', 'text-gray-800');
    tab1Button.classList.add('bg-none', 'text-gray-500');
    tab2Button.classList.remove('bg-none', 'text-gray-500');
    tab2Button.classList.add('bg-gray-300', 'text-gray-800');
});
