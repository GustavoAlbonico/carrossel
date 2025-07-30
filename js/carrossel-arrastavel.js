
const carrosseisArrastaveisLista = $('.carrossel-customizado-btn-proximo.arrastavel').prev('.carrossel-customizado-lista');

let arrastando = false;
let posicaoInicialEixoX;
let animandoCarrosselItem = false;
let carroselItemTranslateXModificado = false;

const validarLimiteMovimentado = (carrosselLista, carrosselItens, carroselItensTranslateXMovimentado) => {
    const carrosselListaRect = carrosselLista.get(0).getBoundingClientRect();
    const carroselItemPrimeiroRect = carrosselItens.first().get(0).getBoundingClientRect();
    const carroselItemUltimoRect = carrosselItens.last().get(0).getBoundingClientRect();

    if (carroselItensTranslateXMovimentado > 0 && carroselItemPrimeiroRect.left >= carrosselListaRect.left) {
        return false;
    } else if (carroselItensTranslateXMovimentado < 0 && carroselItemUltimoRect.right <= carrosselListaRect.right) {
        return false;
    }

    return true;
}

const atualizarCarrosselInfinitoItensVisiveisConformeDirecaoMovimentada = (carrosselLista, carroselItensTranslateXMovimentado, carrosselTipoBloco) => {
    const carrosselItens = carrosselLista.find('.carrossel-customizado-item');
    const carrosselListaRect = carrosselLista.get(0).getBoundingClientRect();
    const carroselItemPrimeiroRect = carrosselItens.first().get(0).getBoundingClientRect();
    const carroselItemUltimoRect = carrosselItens.last().get(0).getBoundingClientRect();
    const carroselItemLargura = carrosselItens.first().width();
    const carrosselItensGap = parseInt(carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-gap'));
    const carrosselQuantidadeItensVisiveis = parseInt(carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis'));

    if (
        carroselItensTranslateXMovimentado > 0 &&
        Math.abs(carrosselListaRect.left - carroselItemPrimeiroRect.left) < (carroselItemLargura + carrosselItensGap)
    ) {
        carrosselTipoBloco ? carrosselLista.prepend(carrosselItens.slice(carrosselItens.length - carrosselQuantidadeItensVisiveis, carrosselItens.length)) : carrosselLista.prepend(carrosselItens.last());
        atualizarCounterCarrosselItem(carrosselLista);
    } else if (
        carroselItensTranslateXMovimentado < 0 &&
        Math.abs(carrosselListaRect.right - carroselItemUltimoRect.right) < (carroselItemLargura + carrosselItensGap)
    ) {
        carrosselTipoBloco ? carrosselLista.append(carrosselItens.slice(0, carrosselQuantidadeItensVisiveis)) : carrosselLista.append(carrosselItens.first());
        atualizarCounterCarrosselItem(carrosselLista);
    }
}

const buscarTranslateXAtualizadoCarrosselItemFinito = (
    carrosselItensGap, carroselItemLargura,
    carroselItemTranslateXAtual,
    carrosselLista, carrosselItens,
) => {
    const carroselQuantidadeItensArrastado = Math.ceil(Math.abs(carroselItemTranslateXAtual) / (carroselItemLargura + carrosselItensGap));
    const limiteArrastandoAtingido = +!validarLimiteMovimentado(carrosselLista, carrosselItens, carroselItemTranslateXAtual);//ele retorna boolean sendo true 1 false 0
    const carroselItemTranslateXAjuste = (carroselQuantidadeItensArrastado - limiteArrastandoAtingido) * (carrosselItensGap + carroselItemLargura);

    let carroselItemTranslateXAtualizado = -1 * carroselItemTranslateXAjuste;
    if (carroselItemTranslateXAtual > 0) {
        carroselItemTranslateXAtualizado = carroselItemTranslateXAjuste;
    }

    if (!carroselItemTranslateXAtual) {//se for 0px não faz nada
        carroselItemTranslateXAtualizado = carroselItemTranslateXAtual;
    } else {
        const carrosselListaRect = carrosselLista.get(0).getBoundingClientRect();
        const carroselItemPrimeiroRect = carrosselItens.first().get(0).getBoundingClientRect();
        const carroselItemUltimoRect = carrosselItens.last().get(0).getBoundingClientRect();

        if (
            carroselItemTranslateXAtual > 0 &&
            Math.abs(carrosselListaRect.left - carroselItemPrimeiroRect.left) < (carroselItemLargura + carrosselItensGap)
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

    return carroselItemTranslateXAtualizado;
}

const buscarTranslateXAtualizadoCarrosselItemInfinito = (
    carrosselItensGap, carroselItemLargura,
    carroselItemTranslateXAtual,
) => {
    const carroselQuantidadeItensArrastado = Math.ceil(Math.abs(carroselItemTranslateXAtual) / (carroselItemLargura + carrosselItensGap));
    const carroselItemTranslateXAjuste = carroselQuantidadeItensArrastado * (carrosselItensGap + carroselItemLargura);

    let carroselItemTranslateXAtualizado = -1 * carroselItemTranslateXAjuste;
    if (carroselItemTranslateXAtual > 0) {
        carroselItemTranslateXAtualizado = carroselItemTranslateXAjuste;
    }

    if (!carroselItemTranslateXAtual) {//se for 0px não faz nada
        carroselItemTranslateXAtualizado = carroselItemTranslateXAtual;
    }

    return carroselItemTranslateXAtualizado;
}

const buscarTranslateXAtualizadoCarrosselItemFinitoBloco = (
    carrosselItensGap, carroselItemLargura,
    carroselItemTranslateXAtual,
    carrosselLista, carrosselItens,
) => {
    const carrosselQuantidadeItensVisiveis = +carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis');
    const limiteArrastandoAtingido = !validarLimiteMovimentado(carrosselLista, carrosselItens, carroselItemTranslateXAtual);//ele retorna boolean sendo true 1 false 0
    const carroselItemTranslateXAjuste = limiteArrastandoAtingido ? 0 : carrosselQuantidadeItensVisiveis * (carrosselItensGap + carroselItemLargura);

    let carroselItemTranslateXAtualizado = -1 * carroselItemTranslateXAjuste;
    if (carroselItemTranslateXAtual > 0) {
        carroselItemTranslateXAtualizado = carroselItemTranslateXAjuste;
    }

    if (!carroselItemTranslateXAtual) {//se for 0px não faz nada
        carroselItemTranslateXAtualizado = carroselItemTranslateXAtual;
    } else {
        const carrosselListaRect = carrosselLista.get(0).getBoundingClientRect();
        const carroselItemPrimeiroRect = carrosselItens.first().get(0).getBoundingClientRect();
        const carroselItemUltimoRect = carrosselItens.last().get(0).getBoundingClientRect();

        if (carroselItemTranslateXAtual > 0 && carrosselListaRect.left >= carroselItemPrimeiroRect.left) {
            carrosselLista.siblings('.carrossel-customizado-btn-anterior:not(.carrossel-customizado-btn-disabled):not(.infinito)').addClass('carrossel-customizado-btn-disabled');
        } else {
            carrosselLista.siblings('.carrossel-customizado-btn-anterior.carrossel-customizado-btn-disabled:not(.infinito)').removeClass('carrossel-customizado-btn-disabled');
        }

        if (carroselItemTranslateXAtual < 0 && carrosselListaRect.right <= carroselItemUltimoRect.right) {
            carrosselLista.siblings('.carrossel-customizado-btn-proximo:not(.carrossel-customizado-btn-disabled):not(.infinito)').addClass('carrossel-customizado-btn-disabled');
        } else {
            carrosselLista.siblings('.carrossel-customizado-btn-proximo.carrossel-customizado-btn-disabled:not(.infinito)').removeClass('carrossel-customizado-btn-disabled');
        }
    }

    return carroselItemTranslateXAtualizado;
}

const buscarTranslateXAtualizadoCarrosselItemInfinitoBloco = (
    carrosselItensGap, carroselItemLargura,
    carroselItemTranslateXAtual, carrosselLista
) => {
    const carrosselQuantidadeItensVisiveis = parseInt(carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis'));
    const carroselItemTranslateXAjuste = carrosselQuantidadeItensVisiveis * (carrosselItensGap + carroselItemLargura);

    let carroselItemTranslateXAtualizado = -1 * carroselItemTranslateXAjuste;
    if (carroselItemTranslateXAtual > 0) {
        carroselItemTranslateXAtualizado = carroselItemTranslateXAjuste;
    }

    if (!carroselItemTranslateXAtual) {//se for 0px não faz nada
        carroselItemTranslateXAtualizado = carroselItemTranslateXAtual;
    }

    return carroselItemTranslateXAtualizado;
}

const arrastarCarroselItem = (containerAtual, buscarTranslateXAtualizadoCarrosselItem) => {
    const carrosselLista = containerAtual.find('.carrossel-customizado-lista');
    const carrosselItens = carrosselLista.find('.carrossel-customizado-item');

    const carrosselItensGap = parseInt(containerAtual.css('--carrossel-itens-gap'));
    const carroselItemLargura = carrosselItens.first().width();
    const carroselItemTranslateXAtual = +carrosselItens.first().css('transform').match(/matrix\(([^)]+)\)/)[1].split(', ')[4];

    const carroselItemTranslateXAtualizado = buscarTranslateXAtualizadoCarrosselItem(
        carrosselItensGap, carroselItemLargura, carroselItemTranslateXAtual,
        carrosselLista, carrosselItens,
    );

    carroselItemTranslateXModificado = carroselItemTranslateXAtualizado !== 0;//para validação de redirecionamentos

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

        animandoCarrosselItem = false;      
        atualizarAcessibilidadeCarrossel();
    }, carroselItemAnimacaoMagneticaDuracao);

}

carrosseisArrastaveisLista.on('mousedown touchstart', function (evento) {
    if (evento.target.classList.contains('carrossel-customizado-lista')) return;
    if (animandoCarrosselItem) return;
    arrastando = true;

    const carrosselLista = $(evento.currentTarget);
    carrosselLista.next('.carrossel-customizado-btn-proximo.arrastavel').addClass('arrastando');
    carrosselLista.find('.carrossel-customizado-item').css('transition', 'none');

    posicaoInicialEixoX = (evento.pageX || evento.originalEvent.touches[0].pageX) - carrosselLista.offset().left;
});

$(document).on('mouseup touchend', function (evento) {
    if (!arrastando) return;
    arrastando = false;
    animandoCarrosselItem = true;

    const containerAtual = $(evento.currentTarget).find('.carrossel-customizado-btn-proximo.arrastavel.arrastando').closest('.carrossel-customizado-container');
    const classesBtnProximo = containerAtual.find('.carrossel-customizado-btn-proximo').attr('class');

    if (['bloco', 'infinito'].every(classe => classesBtnProximo.split(' ').includes(classe))) {
        arrastarCarroselItem(containerAtual, buscarTranslateXAtualizadoCarrosselItemInfinitoBloco);
    } else if (classesBtnProximo.includes('bloco')) {
        arrastarCarroselItem(containerAtual, buscarTranslateXAtualizadoCarrosselItemFinitoBloco);
    } else if (classesBtnProximo.includes('infinito')) {
        arrastarCarroselItem(containerAtual, buscarTranslateXAtualizadoCarrosselItemInfinito);
    } else {
        arrastarCarroselItem(containerAtual, buscarTranslateXAtualizadoCarrosselItemFinito);
    }
});

carrosseisArrastaveisLista.on('mousemove touchmove', function (evento) {
    if (!arrastando) return;
    evento.preventDefault();

    const carrosselLista = $(evento.currentTarget);
    const carrosselItens = carrosselLista.find('.carrossel-customizado-item');

    const posicaoAtualEixoX = (evento.pageX || evento.originalEvent.touches[0].pageX) - carrosselLista.offset().left;
    const carroselItensTranslateXMovimentado = (posicaoAtualEixoX - posicaoInicialEixoX) * 1;

    const classesBtnProximo = carrosselLista.siblings('.carrossel-customizado-btn-proximo').attr('class');
    if (['bloco', 'infinito'].every(classe => classesBtnProximo.split(' ').includes(classe))) {
        atualizarCarrosselInfinitoItensVisiveisConformeDirecaoMovimentada(carrosselLista, carroselItensTranslateXMovimentado, true);
    } else if (classesBtnProximo.includes('bloco')) {
        if (!validarLimiteMovimentado(carrosselLista, carrosselItens, carroselItensTranslateXMovimentado)) return;
    } else if (classesBtnProximo.includes('infinito')) {
        atualizarCarrosselInfinitoItensVisiveisConformeDirecaoMovimentada(carrosselLista, carroselItensTranslateXMovimentado, false);
    } else {
        if (!validarLimiteMovimentado(carrosselLista, carrosselItens, carroselItensTranslateXMovimentado)) return;
    }

    carrosselLista.find('.carrossel-customizado-item').css({ 'transform': `translateX(${carroselItensTranslateXMovimentado}px)` });
});

$('.carrossel-customizado-item:has(.carrossel-customizado-btn-proximo.arrastavel) *').on('click', (evento) => {
    if (carroselItemTranslateXModificado) {
        evento.preventDefault();
    }
});