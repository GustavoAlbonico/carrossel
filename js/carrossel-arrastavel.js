
const carrosseisArrastaveisLista = $('.carrossel-customizado-btn-proximo.arrastavel').prev('.carrossel-customizado-lista');

let arrastando = false;
let posicaoInicialEixoX;
let posicaoScrollAtual;
let animandoItem = false;

const validarLimitesArrastando = (carrosselLista, carrosselItens) => {
    const carroselItemLargura = carrosselItens.first().width();
    const carrosselListaRect = carrosselLista.get(0).getBoundingClientRect();
    const carroselItemPrimeiroRect = carrosselItens.first().get(0).getBoundingClientRect();
    const carroselItemUltimoRect = carrosselItens.last().get(0).getBoundingClientRect();

    if (
        carroselItemPrimeiroRect.left > carrosselListaRect.left ||
        (carroselItemUltimoRect.left + carroselItemLargura) < (carrosselListaRect.right - 1)
    ) {
        return false;
    }

    return true;
}

carrosseisArrastaveisLista.on('mousedown touchstart', function (evento) {
    if (evento.target.classList.contains('carrossel-customizado-lista')) return;
    if (animandoItem) return;
    arrastando = true;

    const carrosselLista = $(evento.currentTarget);
    carrosselLista.next('.carrossel-customizado-btn-proximo.arrastavel').addClass('arrastando');
    carrosselLista.find('.carrossel-customizado-item').css('transition', 'none');

    posicaoInicialEixoX = (evento.pageX || evento.originalEvent.touches[0].pageX) - carrosselLista.offset().left;
    posicaoScrollAtual = carrosselLista.scrollLeft();
});

$(document).on('mouseup touchend', function (evento) {
    if (!arrastando) return;
    arrastando = false;
    animandoItem = true;

    const containerAtual = $(evento.currentTarget).find('.carrossel-customizado-btn-proximo.arrastavel.arrastando').closest('.carrossel-customizado-container');
    const carrosselLista = containerAtual.find('.carrossel-customizado-lista');
    const carrosselItens = carrosselLista.find('.carrossel-customizado-item');

    const carrosselItensGap = parseInt(containerAtual.css('--carrossel-itens-gap'));
    const carroselItemLargura = carrosselItens.first().width();
    const carroselItemTranslateXAtual = +carrosselItens.first().css('transform').match(/matrix\(([^)]+)\)/)[1].split(', ')[4];
    const carroselQuantidadeItensArrastado = Math.ceil(Math.abs(carroselItemTranslateXAtual) / carroselItemLargura);

    let limiteArrastandoAtingido = !validarLimitesArrastando(carrosselLista, carrosselItens);
    let carroselItemTranslateXAjuste = ((carrosselItensGap * carroselQuantidadeItensArrastado) + (carroselItemLargura + (carroselItemTranslateXAtual % carroselItemLargura)));
    let carroselItemTranslateXAtualizado = carroselItemTranslateXAtual + (-1 * carroselItemTranslateXAjuste);
    carroselItemTranslateXAtualizado = limiteArrastandoAtingido ? carroselItemTranslateXAtualizado + (carroselItemLargura + carrosselItensGap) : carroselItemTranslateXAtualizado;
    if (carroselItemTranslateXAtual > 0) {
        carroselItemTranslateXAjuste = (carrosselItensGap * carroselQuantidadeItensArrastado) + (carroselItemLargura - (carroselItemTranslateXAtual % carroselItemLargura));
        carroselItemTranslateXAtualizado = carroselItemTranslateXAtual + carroselItemTranslateXAjuste;
        carroselItemTranslateXAtualizado = limiteArrastandoAtingido ? carroselItemTranslateXAtualizado - (carroselItemLargura + carrosselItensGap) : carroselItemTranslateXAtualizado;
    }

    if (!carroselItemTranslateXAtual) {
        carroselItemTranslateXAtualizado = carroselItemTranslateXAtual;
    }

    const carroselItemAnimacaoMagneticaDuracao = 300;
    carrosselItens.css({
        'transition': ` ${carroselItemAnimacaoMagneticaDuracao}ms ease-in-out`,
        'transform': `translateX(${carroselItemTranslateXAtualizado}px)`,
    });

    setTimeout(async () => {
        await carrosselItens.css({ 'transition': `none` });
        const carrosselListaRect = await carrosselLista.get(0).getBoundingClientRect();
        await carrosselItens.each(async (index, item) => {
            const carrosselCustomizadoItem = $(item);
            const carrosselCustomizadoItemRect = await carrosselCustomizadoItem.get(0).getBoundingClientRect();//para pegar a possição em tempo real mesmo com translate

            if (
                carrosselCustomizadoItemRect.left >= (carrosselListaRect.left - 1) &&
                carrosselCustomizadoItemRect.left <= carrosselListaRect.right
            ) {
                carrosselCustomizadoItem.addClass('destaque');
            } else {
                carrosselCustomizadoItem.removeClass('destaque');
            }
        });

        carrosselItens.css('transform', ``);
        containerAtual.find('.carrossel-customizado-btn-proximo.arrastavel').removeClass('arrastando');
        await atualizarCounterCarrosselItem(containerAtual.find('.carrossel-customizado-lista'));

        const carrosselAnimationDuration = containerAtual.css('--carrossel-animation-duration');
        carrosselLista.find('.carrossel-customizado-item').css('transition', `${carrosselAnimationDuration} ease-in-out`);

        animandoItem = false;
    }, carroselItemAnimacaoMagneticaDuracao);
});

carrosseisArrastaveisLista.on('mousemove touchmove', function (evento) {
    if (!arrastando) return;
    evento.preventDefault();

    const carrosselLista = $(evento.currentTarget);
    const carrosselItens = carrosselLista.find('.carrossel-customizado-item');
    if (!validarLimitesArrastando(carrosselLista, carrosselItens)) return;

    const posicaoAtualEixoX = (evento.pageX || evento.originalEvent.touches[0].pageX) - carrosselLista.offset().left;
    const distanciaArrastada = (posicaoAtualEixoX - posicaoInicialEixoX) * 1;

    carrosselLista.find('.carrossel-customizado-item').css({ 'transform': `translateX(${distanciaArrastada}px)` });
});