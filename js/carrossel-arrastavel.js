
const carrosseisArrastaveisLista = $('.carrossel-customizado-btn-proximo.arrastavel').prev('.carrossel-customizado-lista');

let arrastando = false;
let posicaoInicialEixoX;
let posicaoScrollAtual;
let animandoItem = false;

const verificarBotoes = (carrosselLista, carroselItemTranslateXAtual, carrosselItensGap) => {
    const carrosselItens = carrosselLista.find('.carrossel-customizado-item');
    const carroselItemLargura = carrosselItens.first().width();

    const carrosselListaRect = carrosselLista.get(0).getBoundingClientRect();
    const carroselItemPrimeiroRect = carrosselItens.first().get(0).getBoundingClientRect();
    const carroselItemUltimoRect = carrosselItens.last().get(0).getBoundingClientRect();

    if (
        carroselItemTranslateXAtual > 0 &&
        Math.abs(carroselItemPrimeiroRect.left) < (carroselItemLargura + carrosselItensGap) - carrosselListaRect.left
    ) {
        carrosselLista.siblings('.carrossel-customizado-btn-anterior:not(.carrossel-customizado-btn-disabled):not(.infinito)').addClass('carrossel-customizado-btn-disabled');
    } else {
        carrosselLista.siblings('.carrossel-customizado-btn-anterior.carrossel-customizado-btn-disabled:not(.infinito)').removeClass('carrossel-customizado-btn-disabled');
    }

    if (
        carroselItemTranslateXAtual < 0 &&
        Math.abs(carrosselListaRect.right - carroselItemUltimoRect.right) < (carroselItemLargura + carrosselItensGap)
    ) {
        carrosselLista.siblings('.carrossel-customizado-btn-proximo:not(.carrossel-customizado-btn-disabled):not(.infinito)').addClass('carrossel-customizado-btn-disabled');
    } else {
        carrosselLista.siblings('.carrossel-customizado-btn-proximo.carrossel-customizado-btn-disabled:not(.infinito)').removeClass('carrossel-customizado-btn-disabled');
    }


}
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

const arrastarCarroselFinitoItem = (containerAtual) => {
    const carrosselLista = containerAtual.find('.carrossel-customizado-lista');
    const carrosselItens = carrosselLista.find('.carrossel-customizado-item');

    const carrosselItensGap = parseInt(containerAtual.css('--carrossel-itens-gap'));
    const carroselItemLargura = carrosselItens.first().width();
    const carroselItemTranslateXAtual = +carrosselItens.first().css('transform').match(/matrix\(([^)]+)\)/)[1].split(', ')[4];
    const carroselQuantidadeItensArrastado = Math.ceil(Math.abs(carroselItemTranslateXAtual) / (carroselItemLargura + carrosselItensGap));
    const limiteArrastandoAtingido = +!validarLimitesArrastando(carrosselLista, carrosselItens);//ele retorna boolean sendo true 1 false 0
    const carroselItemTranslateXAjuste = (carroselQuantidadeItensArrastado - limiteArrastandoAtingido) * (carrosselItensGap + carroselItemLargura);

    let carroselItemTranslateXAtualizado = -1 * carroselItemTranslateXAjuste;
    if (carroselItemTranslateXAtual > 0) {
        carroselItemTranslateXAtualizado = carroselItemTranslateXAjuste;
    }

    if (!carroselItemTranslateXAtual) {//se for 0px não faz nada
        carroselItemTranslateXAtualizado = carroselItemTranslateXAtual;
    } else {
        verificarBotoes(carrosselLista, carroselItemTranslateXAtual, carrosselItensGap);
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
}
// const arrastarCarroselInfinitoItem = () => {

// }
// const arrastarCarroselFinitoBlocoItem = () => {

// }
// const arrastarCarroselInfinitoBlocoItem = () => {

// }


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

    arrastarCarroselFinitoItem(containerAtual);
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