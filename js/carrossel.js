const btnsProximos = $('.carrossel-customizado-btn-proximo:not(.infinito):not(.bloco)');
const btnsAnteriores = $('.carrossel-customizado-btn-anterior:not(.infinito):not(.bloco)');
const btnsProximosInfinito = $('.carrossel-customizado-btn-proximo.infinito:not(.bloco)');
const btnsAnterioresInfinito = $('.carrossel-customizado-btn-anterior.infinito:not(.bloco)');
const btnsProximosBloco = $('.carrossel-customizado-btn-proximo.bloco:not(.infinito)');
const btnsAnterioresBloco = $('.carrossel-customizado-btn-anterior.bloco:not(.infinito)');
const btnsProximosInfinitoBloco = $('.carrossel-customizado-btn-proximo.infinito.bloco');
const btnsAnterioresInfinitoBloco = $('.carrossel-customizado-btn-anterior.infinito.bloco');

// variaveis arrastavel inicio
const carrosseisArrastaveisLista = $('.carrossel-customizado-btn-proximo.arrastavel').prev('.carrossel-customizado-lista');
let arrastando = false;
let posicaoInicialEixoX;
let animandoCarrosselItem = false;
let carrosselItemTranslateXModificado = false;
// variaveis arrastavel fim

const atualizarAcessibilidadeCarrossel = () => {
    const novaLargura = $(window).width();

    const carrosselItensDestaque = $('.carrossel-customizado-btn-proximo:not(.arrastavel)').closest('.carrossel-customizado-container').find('.carrossel-customizado-lista .carrossel-customizado-item.destaque');
    carrosselItensDestaque.find('a, button, input, select, textarea').removeAttr('tabindex');
    if (novaLargura < 1024) return;
    const carrosselItensSemDestaque = $('.carrossel-customizado-btn-proximo').closest('.carrossel-customizado-container').find('.carrossel-customizado-lista .carrossel-customizado-item:not(.destaque)');
    carrosselItensSemDestaque.find('a, button, input, select, textarea').prop('tabindex', '-1');
}

const verificarQuantidadeItensCarrossel = (carrosselContainer, carrosselItensTamanho, carrosselQuantidadeItensVisiveis) => {
    if (carrosselItensTamanho > carrosselQuantidadeItensVisiveis) return;

    $(carrosselContainer).find(`.carrossel-customizado-lista`).css({ justifyContent: 'center' })
    $(carrosselContainer).find(`.carrossel-customizado-lista`).next('.carrossel-customizado-btn-proximo').css({ display: 'none' });
    $(carrosselContainer).find(`.carrossel-customizado-lista`).prev('.carrossel-customizado-btn-anterior').css({ display: 'none' });
}

const atualizarCounterCarrosselItem = async (carrosselLista) => {
    const carrosselItensDestaque = carrosselLista.find('.carrossel-customizado-item.destaque');

    carrosselItensDestaque.each((index, item) => {
        $(item).get(0).style.removeProperty('--carrossel-item-counter');
    });
    carrosselItensDestaque.last().nextAll().each((index, item) => {
        $(item).get(0).style.setProperty('--carrossel-item-counter', index + 1);
    });
    carrosselItensDestaque.first().prevAll().get().forEach((item, index) => {
        $(item).get(0).style.setProperty('--carrossel-item-counter', index + 1);
    });
}

const adicionarCarrosselItensEmDestaque = () => {

    btnsProximos.closest('.carrossel-customizado-container').each((index, container) => {
        const carrosselQuantidadeItensVisiveis = +$(container).css('--carrossel-itens-visiveis');
        const carrosselItens = $(container).find(`.carrossel-customizado-lista`).find('.carrossel-customizado-item');

        carrosselItens.each((index, item) => {
            if (index < carrosselQuantidadeItensVisiveis) {
                $(item).addClass('destaque');
            } else {
                $(item).get(0).style.setProperty('--carrossel-item-counter', (index + 1) - carrosselQuantidadeItensVisiveis);
            }
        });

        verificarQuantidadeItensCarrossel(container, carrosselItens.length, carrosselQuantidadeItensVisiveis);
    });

    btnsProximosInfinito.closest('.carrossel-customizado-container').each((index, container) => {
        const carrosselQuantidadeItensVisiveis = +$(container).css('--carrossel-itens-visiveis');
        const carrosselItens = $(container).find(`.carrossel-customizado-lista`).find('.carrossel-customizado-item');
        carrosselItens.each((index, item) => {
            if (index < carrosselQuantidadeItensVisiveis) {
                $(item).addClass('destaque');
            } else {
                $(item).get(0).style.setProperty('--carrossel-item-counter', (index + 1) - carrosselQuantidadeItensVisiveis);
            }
        });

        verificarQuantidadeItensCarrossel(container, carrosselItens.length, carrosselQuantidadeItensVisiveis);
    });

    btnsProximosInfinitoBloco.closest('.carrossel-customizado-container').each((index, container) => {
        const carrosselQuantidadeItensVisiveis = +$(container).css('--carrossel-itens-visiveis');
        const carrosselLista = $(container).find(`.carrossel-customizado-lista`);
        const carrosselItens = carrosselLista.find('.carrossel-customizado-item');
        carrosselItens.each((index, item) => {
            if (index < carrosselQuantidadeItensVisiveis) {
                $(item).addClass('destaque');
            } else {
                $(item).get(0).style.setProperty('--carrossel-item-counter', (index + 1) - carrosselQuantidadeItensVisiveis);
            }
        });


        let carrosselItensFaltantes = carrosselItens.length % carrosselQuantidadeItensVisiveis;
        carrosselItensFaltantes = carrosselItensFaltantes > 0 && carrosselQuantidadeItensVisiveis - carrosselItensFaltantes;
        for (let posicao = 0; posicao < carrosselItensFaltantes; posicao++) {
            carrosselLista.append(carrosselItens.last().clone().css({ visibility: 'hidden', opacity: 0 }));
        }

        verificarQuantidadeItensCarrossel(container, carrosselItens.length, carrosselQuantidadeItensVisiveis);
    });

    btnsProximosBloco.closest('.carrossel-customizado-container').each((index, container) => {
        const carrosselQuantidadeItensVisiveis = +$(container).css('--carrossel-itens-visiveis');
        const carrosselLista = $(container).find(`.carrossel-customizado-lista`);
        const carrosselItens = carrosselLista.find('.carrossel-customizado-item');
        carrosselItens.each((index, item) => {
            if (index < carrosselQuantidadeItensVisiveis) {
                $(item).addClass('destaque');
            } else {
                $(item).get(0).style.setProperty('--carrossel-item-counter', (index + 1) - carrosselQuantidadeItensVisiveis);
            }
        });

        verificarQuantidadeItensCarrossel(container, carrosselItens.length, carrosselQuantidadeItensVisiveis);
    });
}

// funcoes arrastavel inicio //
const validarLimiteMovimentado = (carrosselLista, carrosselItens, carrosselItensTranslateXMovimentado) => {
    const carrosselListaRect = carrosselLista.get(0).getBoundingClientRect();
    const carrosselItemPrimeiroRect = carrosselItens.first().get(0).getBoundingClientRect();
    const carrosselItemUltimoRect = carrosselItens.last().get(0).getBoundingClientRect();

    if (carrosselItensTranslateXMovimentado > 0 && carrosselItemPrimeiroRect.left >= carrosselListaRect.left) {
        return false;
    } else if (carrosselItensTranslateXMovimentado < 0 && carrosselItemUltimoRect.right <= carrosselListaRect.right) {
        return false;
    }

    return true;
}

const atualizarCarrosselInfinitoItensVisiveisConformeDirecaoMovimentada = (carrosselLista, carrosselItensTranslateXMovimentado, carrosselTipoBloco) => {
    const carrosselItens = carrosselLista.find('.carrossel-customizado-item');
    const carrosselListaRect = carrosselLista.get(0).getBoundingClientRect();
    const carrosselItemPrimeiroRect = carrosselItens.first().get(0).getBoundingClientRect();
    const carrosselItemUltimoRect = carrosselItens.last().get(0).getBoundingClientRect();
    const carrosselItemLargura = carrosselItens.first().width();
    const carrosselItensGap = parseInt(carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-gap'));
    const carrosselQuantidadeItensVisiveis = parseInt(carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis'));

    if (
        carrosselItensTranslateXMovimentado > 0 &&
        Math.abs(carrosselListaRect.left - carrosselItemPrimeiroRect.left) < (carrosselItemLargura + carrosselItensGap)
    ) {
        carrosselTipoBloco ? carrosselLista.prepend(carrosselItens.slice(carrosselItens.length - carrosselQuantidadeItensVisiveis, carrosselItens.length)) : carrosselLista.prepend(carrosselItens.last());
        atualizarCounterCarrosselItem(carrosselLista);
    } else if (
        carrosselItensTranslateXMovimentado < 0 &&
        Math.abs(carrosselListaRect.right - carrosselItemUltimoRect.right) < (carrosselItemLargura + carrosselItensGap)
    ) {
        carrosselTipoBloco ? carrosselLista.append(carrosselItens.slice(0, carrosselQuantidadeItensVisiveis)) : carrosselLista.append(carrosselItens.first());
        atualizarCounterCarrosselItem(carrosselLista);
    }
}

const buscarTranslateXAtualizadoCarrosselItemFinito = (
    carrosselItensGap, carrosselItemLargura,
    carrosselItemTranslateXAtual,
    carrosselLista, carrosselItens,
) => {
    const carrosselQuantidadeItensArrastado = Math.ceil(Math.abs(carrosselItemTranslateXAtual) / (carrosselItemLargura + carrosselItensGap));
    const limiteArrastandoAtingido = +!validarLimiteMovimentado(carrosselLista, carrosselItens, carrosselItemTranslateXAtual);//ele retorna boolean sendo true 1 false 0
    const carrosselItemTranslateXAjuste = (carrosselQuantidadeItensArrastado - limiteArrastandoAtingido) * (carrosselItensGap + carrosselItemLargura);

    let carrosselItemTranslateXAtualizado = -1 * carrosselItemTranslateXAjuste;
    if (carrosselItemTranslateXAtual > 0) {
        carrosselItemTranslateXAtualizado = carrosselItemTranslateXAjuste;
    }

    if (!carrosselItemTranslateXAtual) {//se for 0px não faz nada
        carrosselItemTranslateXAtualizado = carrosselItemTranslateXAtual;
    } else {//habilita ou desabilita os botoes proximo/anterior
        const carrosselListaRect = carrosselLista.get(0).getBoundingClientRect();
        const carrosselItemPrimeiroRect = carrosselItens.first().get(0).getBoundingClientRect();
        const carrosselItemUltimoRect = carrosselItens.last().get(0).getBoundingClientRect();

        if (
            carrosselItemTranslateXAtual > 0 &&
            Math.abs(carrosselListaRect.left - carrosselItemPrimeiroRect.left) < (carrosselItemLargura + carrosselItensGap)
        ) {
            carrosselLista.siblings('.carrossel-customizado-btn-anterior:not(.carrossel-customizado-btn-disabled):not(.infinito)').addClass('carrossel-customizado-btn-disabled');
        } else {
            carrosselLista.siblings('.carrossel-customizado-btn-anterior.carrossel-customizado-btn-disabled:not(.infinito)').removeClass('carrossel-customizado-btn-disabled');
        }

        if (
            carrosselItemTranslateXAtual < 0 &&
            Math.abs(carrosselListaRect.right - carrosselItemUltimoRect.right) < (carrosselItemLargura + carrosselItensGap)
        ) {
            carrosselLista.siblings('.carrossel-customizado-btn-proximo:not(.carrossel-customizado-btn-disabled):not(.infinito)').addClass('carrossel-customizado-btn-disabled');
        } else {
            carrosselLista.siblings('.carrossel-customizado-btn-proximo.carrossel-customizado-btn-disabled:not(.infinito)').removeClass('carrossel-customizado-btn-disabled');
        }
    }

    return carrosselItemTranslateXAtualizado;
}

const buscarTranslateXAtualizadoCarrosselItemInfinito = (
    carrosselItensGap, carrosselItemLargura,
    carrosselItemTranslateXAtual,
) => {
    const carrosselQuantidadeItensArrastado = Math.ceil(Math.abs(carrosselItemTranslateXAtual) / (carrosselItemLargura + carrosselItensGap));
    const carrosselItemTranslateXAjuste = carrosselQuantidadeItensArrastado * (carrosselItensGap + carrosselItemLargura);

    let carrosselItemTranslateXAtualizado = -1 * carrosselItemTranslateXAjuste;
    if (carrosselItemTranslateXAtual > 0) {
        carrosselItemTranslateXAtualizado = carrosselItemTranslateXAjuste;
    }

    if (!carrosselItemTranslateXAtual) {//se for 0px não faz nada
        carrosselItemTranslateXAtualizado = carrosselItemTranslateXAtual;
    }

    return carrosselItemTranslateXAtualizado;
}

const buscarTranslateXAtualizadoCarrosselItemFinitoBloco = (
    carrosselItensGap, carrosselItemLargura,
    carrosselItemTranslateXAtual,
    carrosselLista, carrosselItens,
) => {
    const carrosselQuantidadeItensVisiveis = +carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis');
    const limiteArrastandoAtingido = !validarLimiteMovimentado(carrosselLista, carrosselItens, carrosselItemTranslateXAtual);//ele retorna boolean sendo true 1 false 0
    const carrosselItemTranslateXAjuste = limiteArrastandoAtingido ? 0 : carrosselQuantidadeItensVisiveis * (carrosselItensGap + carrosselItemLargura);

    let carrosselItemTranslateXAtualizado = -1 * carrosselItemTranslateXAjuste;
    if (carrosselItemTranslateXAtual > 0) {
        carrosselItemTranslateXAtualizado = carrosselItemTranslateXAjuste;
    }

    if (!carrosselItemTranslateXAtual) {//se for 0px não faz nada
        carrosselItemTranslateXAtualizado = carrosselItemTranslateXAtual;
    } else {//habilita ou desabilita os botoes proximo/anterior
        const carrosselListaRect = carrosselLista.get(0).getBoundingClientRect();
        const carrosselItemPrimeiroRect = carrosselItens.first().get(0).getBoundingClientRect();
        const carrosselItemUltimoRect = carrosselItens.last().get(0).getBoundingClientRect();

        if (
            carrosselItemTranslateXAtual > 0 &&
            Math.abs(carrosselItemPrimeiroRect.left) <= carrosselListaRect.right
        ) {
            carrosselLista.siblings('.carrossel-customizado-btn-anterior:not(.carrossel-customizado-btn-disabled):not(.infinito)').addClass('carrossel-customizado-btn-disabled');
        } else {
            carrosselLista.siblings('.carrossel-customizado-btn-anterior.carrossel-customizado-btn-disabled:not(.infinito)').removeClass('carrossel-customizado-btn-disabled');
        }

        if (
            carrosselItemTranslateXAtual < 0 &&
            Math.abs(carrosselItemUltimoRect.right - carrosselListaRect.right) <= carrosselListaRect.right
        ) {
            carrosselLista.siblings('.carrossel-customizado-btn-proximo:not(.carrossel-customizado-btn-disabled):not(.infinito)').addClass('carrossel-customizado-btn-disabled');
        } else {
            carrosselLista.siblings('.carrossel-customizado-btn-proximo.carrossel-customizado-btn-disabled:not(.infinito)').removeClass('carrossel-customizado-btn-disabled');
        }
    }

    return carrosselItemTranslateXAtualizado;
}

const buscarTranslateXAtualizadoCarrosselItemInfinitoBloco = (
    carrosselItensGap, carrosselItemLargura,
    carrosselItemTranslateXAtual, carrosselLista
) => {
    const carrosselQuantidadeItensVisiveis = parseInt(carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis'));
    const carrosselItemTranslateXAjuste = carrosselQuantidadeItensVisiveis * (carrosselItensGap + carrosselItemLargura);

    let carrosselItemTranslateXAtualizado = -1 * carrosselItemTranslateXAjuste;
    if (carrosselItemTranslateXAtual > 0) {
        carrosselItemTranslateXAtualizado = carrosselItemTranslateXAjuste;
    }

    if (!carrosselItemTranslateXAtual) {//se for 0px não faz nada
        carrosselItemTranslateXAtualizado = carrosselItemTranslateXAtual;
    }

    return carrosselItemTranslateXAtualizado;
}

const arrastarCarrosselItem = (containerAtual, buscarTranslateXAtualizadoCarrosselItem) => {
    const carrosselLista = containerAtual.find('.carrossel-customizado-lista');
    const carrosselItens = carrosselLista.find('.carrossel-customizado-item');

    const carrosselItensGap = parseInt(containerAtual.css('--carrossel-itens-gap'));
    const carrosselItemLargura = carrosselItens.first().width();
    const carrosselItemTranslateXAtual = +carrosselItens.first().css('transform').match(/matrix\(([^)]+)\)/)[1].split(', ')[4];

    const carrosselItemTranslateXAtualizado = buscarTranslateXAtualizadoCarrosselItem(
        carrosselItensGap, carrosselItemLargura, carrosselItemTranslateXAtual,
        carrosselLista, carrosselItens,
    );

    carrosselItemTranslateXModificado = carrosselItemTranslateXAtualizado !== 0;//para validação de redirecionamentos

    const carrosselItemAnimacaoMagneticaDuracao = 300;
    carrosselItens.css({
        'transition': ` ${carrosselItemAnimacaoMagneticaDuracao}ms ease-in-out`,
        'transform': `translateX(${carrosselItemTranslateXAtualizado}px)`,
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

        setTimeout(() => {
            const carrosselAnimationDuration = containerAtual.css('--carrossel-animation-duration');
            carrosselLista.find('.carrossel-customizado-item').css('transition', `${carrosselAnimationDuration} ease-in-out`);
        }, 0);//por causa do mozilla firefox utilizado settimeout para forçar toda atualização anterior no css antes de acontecer o que esta no settimout

        animandoCarrosselItem = false;
        atualizarAcessibilidadeCarrossel();
    }, carrosselItemAnimacaoMagneticaDuracao);

}
//funcoes arrastavel fim //

btnsProximos.on('click', (evento) => {
    const carrosselLista = $(evento.target).prev('.carrossel-customizado-lista')
    const carrosselItensDestaque = carrosselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');

    if (carrosselItensDestaque.last().next().length < 1) return;
    if (carrosselItensDestaque.hasClass('proximo')) return;

    carrosselItensDestaque.addClass('proximo');
    carrosselItensDestaque.last().next().addClass('proximo');
    carrosselItensDestaque.first().prev().addClass('proximo');

    setTimeout(() => {
        carrosselLista.find('.carrossel-customizado-item.proximo').removeClass('proximo');
        carrosselItensDestaque.first().removeClass('destaque');
        carrosselItensDestaque.last().next().addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).prev('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));

    if (carrosselItensDestaque.last().next().next().length < 1) {
        $(evento.target).addClass('carrossel-customizado-btn-disabled');
    }

    if ($(evento.target).siblings('.carrossel-customizado-btn-anterior').hasClass('carrossel-customizado-btn-disabled')) {
        $(evento.target).siblings('.carrossel-customizado-btn-anterior').removeClass('carrossel-customizado-btn-disabled');
    }


});

btnsAnteriores.on('click', (evento) => {
    const carrosselLista = $(evento.target).next('.carrossel-customizado-lista')
    const carrosselItensDestaque = carrosselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');

    if (carrosselItensDestaque.first().prev().length < 1) return;
    if (carrosselItensDestaque.hasClass('anterior')) return;

    carrosselItensDestaque.addClass('anterior');
    carrosselItensDestaque.last().next().addClass('anterior');
    carrosselItensDestaque.first().prev().addClass('anterior');

    setTimeout(() => {
        carrosselLista.find('.carrossel-customizado-item.anterior').removeClass('anterior');
        carrosselItensDestaque.last().removeClass('destaque');
        carrosselItensDestaque.first().prev().addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).next('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));


    if (carrosselItensDestaque.first().prev().prev().length < 1) {
        $(evento.target).addClass('carrossel-customizado-btn-disabled');
    }

    if ($(evento.target).siblings('.carrossel-customizado-btn-proximo').hasClass('carrossel-customizado-btn-disabled')) {
        $(evento.target).siblings('.carrossel-customizado-btn-proximo').removeClass('carrossel-customizado-btn-disabled');
    }

});

btnsProximosInfinito.on('click', (evento) => {
    const carrosselLista = $(evento.target).prev('.carrossel-customizado-lista');
    const carrosselItensDestaque = carrosselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');

    if (carrosselItensDestaque.hasClass('proximo')) return;

    const carrosselItens = carrosselLista.find('.carrossel-customizado-item');
    if (carrosselItensDestaque.last().next().length < 1) {
        carrosselLista.append(carrosselItens.first());
        atualizarCounterCarrosselItem($(evento.target).prev('.carrossel-customizado-lista'));
    }

    carrosselItensDestaque.addClass('proximo');
    carrosselItensDestaque.last().next().addClass('proximo');
    carrosselItensDestaque.first().prev().addClass('proximo');

    setTimeout(() => {
        carrosselLista.find('.carrossel-customizado-item.proximo').removeClass('proximo');
        carrosselItensDestaque.first().removeClass('destaque');
        carrosselItensDestaque.last().next().addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).prev('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));
});

btnsAnterioresInfinito.on('click', (evento) => {
    const carrosselLista = $(evento.target).next('.carrossel-customizado-lista');
    const carrosselItensDestaque = carrosselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');

    if (carrosselItensDestaque.hasClass('anterior')) return;

    const carrosselItens = carrosselLista.find('.carrossel-customizado-item');
    if (carrosselItensDestaque.first().prev().length < 1) {
        carrosselLista.prepend(carrosselItens.last());
        atualizarCounterCarrosselItem($(evento.target).next('.carrossel-customizado-lista'));
    }

    carrosselItensDestaque.addClass('anterior');
    carrosselItensDestaque.last().next().addClass('anterior');
    carrosselItensDestaque.first().prev().addClass('anterior');

    setTimeout(() => {
        carrosselLista.find('.carrossel-customizado-item.anterior').removeClass('anterior');
        carrosselItensDestaque.last().removeClass('destaque');
        carrosselItensDestaque.first().prev().addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).next('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));
});

btnsProximosBloco.on('click', (evento) => {
    const carrosselLista = $(evento.target).prev('.carrossel-customizado-lista');
    const carrosselItensDestaque = carrosselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');
    const carrosselQuantidadeItensVisiveis = carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis');

    if (carrosselItensDestaque.last().nextAll().length < 1) return;
    if (carrosselItensDestaque.hasClass('proximo-bloco')) return;

    carrosselItensDestaque.addClass('proximo-bloco');
    carrosselItensDestaque.last().nextAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('proximo-bloco');

    setTimeout(() => {
        carrosselItensDestaque.removeClass('destaque');
        carrosselLista.find('.carrossel-customizado-item.proximo-bloco').removeClass('proximo-bloco');
        carrosselItensDestaque.last().nextAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).prev('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));

    if (carrosselItensDestaque.last().nextAll().slice(carrosselQuantidadeItensVisiveis, carrosselQuantidadeItensVisiveis * 2).length < 1) {
        $(evento.target).addClass('carrossel-customizado-btn-disabled');
    }

    if ($(evento.target).siblings('.carrossel-customizado-btn-anterior').hasClass('carrossel-customizado-btn-disabled')) {
        $(evento.target).siblings('.carrossel-customizado-btn-anterior').removeClass('carrossel-customizado-btn-disabled');
    }
});

btnsAnterioresBloco.on('click', (evento) => {
    const carrosselLista = $(evento.target).next('.carrossel-customizado-lista');
    const carrosselItensDestaque = carrosselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');
    const carrosselQuantidadeItensVisiveis = carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis');

    if (carrosselItensDestaque.first().prevAll().length < 1) return;
    if (carrosselItensDestaque.hasClass('anterior-bloco')) return;

    carrosselItensDestaque.addClass('anterior-bloco');
    carrosselItensDestaque.first().prevAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('anterior-bloco');

    setTimeout(() => {
        carrosselItensDestaque.removeClass('destaque');
        carrosselLista.find('.carrossel-customizado-item.anterior-bloco').removeClass('anterior-bloco');
        carrosselItensDestaque.first().prevAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).next('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));

    if (carrosselItensDestaque.first().prevAll().slice(carrosselQuantidadeItensVisiveis, carrosselQuantidadeItensVisiveis * 2).length < 1) {
        $(evento.target).addClass('carrossel-customizado-btn-disabled');
    }

    if ($(evento.target).siblings('.carrossel-customizado-btn-proximo').hasClass('carrossel-customizado-btn-disabled')) {
        $(evento.target).siblings('.carrossel-customizado-btn-proximo').removeClass('carrossel-customizado-btn-disabled');
    }
});

btnsProximosInfinitoBloco.on('click', (evento) => {
    const carrosselLista = $(evento.target).prev('.carrossel-customizado-lista');
    const carrosselItensDestaque = carrosselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');
    const carrosselQuantidadeItensVisiveis = carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis');

    if (carrosselItensDestaque.hasClass('proximo-bloco')) return;

    const carrosselItens = carrosselLista.find('.carrossel-customizado-item');
    if (carrosselItensDestaque.last().nextAll().length < carrosselQuantidadeItensVisiveis) {
        carrosselLista.append(carrosselItens.slice(0, carrosselQuantidadeItensVisiveis));
        atualizarCounterCarrosselItem($(evento.target).prev('.carrossel-customizado-lista'));
    }

    carrosselItensDestaque.addClass('proximo-bloco');
    carrosselItensDestaque.last().nextAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('proximo-bloco');

    setTimeout(() => {
        carrosselItensDestaque.removeClass('destaque');
        carrosselLista.find('.carrossel-customizado-item.proximo-bloco').removeClass('proximo-bloco');
        carrosselItensDestaque.last().nextAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).prev('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));

});

btnsAnterioresInfinitoBloco.on('click', (evento) => {
    const carrosselLista = $(evento.target).next('.carrossel-customizado-lista');
    const carrosselItensDestaque = carrosselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');
    const carrosselQuantidadeItensVisiveis = carrosselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis');

    if (carrosselItensDestaque.hasClass('anterior-bloco')) return;

    const carrosselItens = carrosselLista.find('.carrossel-customizado-item');
    if (carrosselItensDestaque.first().prevAll().length < carrosselQuantidadeItensVisiveis) {
        carrosselLista.prepend(carrosselItens.slice(carrosselItens.length - carrosselQuantidadeItensVisiveis, carrosselItens.length));
        atualizarCounterCarrosselItem($(evento.target).next('.carrossel-customizado-lista'));
    }

    carrosselItensDestaque.addClass('anterior-bloco');
    carrosselItensDestaque.first().prevAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('anterior-bloco');

    setTimeout(() => {
        carrosselItensDestaque.removeClass('destaque');
        carrosselLista.find('.carrossel-customizado-item.anterior-bloco').removeClass('anterior-bloco');
        carrosselItensDestaque.first().prevAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).next('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));

});

$(document).ready(() => {
    adicionarCarrosselItensEmDestaque();
    atualizarAcessibilidadeCarrossel();
});

$(window).on('resize', () => {
    atualizarAcessibilidadeCarrossel();
});

// eventos arrastavel inicio //
carrosseisArrastaveisLista.on('mousedown touchstart', (evento) => {
    if (evento.target.classList.contains('carrossel-customizado-lista')) return;
    if (animandoCarrosselItem) return;
    arrastando = true;

    const carrosselLista = $(evento.currentTarget);
    carrosselLista.next('.carrossel-customizado-btn-proximo.arrastavel').addClass('arrastando');
    carrosselLista.find('.carrossel-customizado-item').css('transition', 'none');

    posicaoInicialEixoX = (evento.pageX || evento.originalEvent.touches[0].pageX) - carrosselLista.offset().left;
});

carrosseisArrastaveisLista.on('mousemove touchmove', (evento) => {
    if (!arrastando) return;
    evento.preventDefault();

    const carrosselLista = $(evento.currentTarget);
    const carrosselItens = carrosselLista.find('.carrossel-customizado-item');

    const posicaoAtualEixoX = (evento.pageX || evento.originalEvent.touches[0].pageX) - carrosselLista.offset().left;
    const carrosselItensTranslateXMovimentado = (posicaoAtualEixoX - posicaoInicialEixoX) * 1;

    const classesBtnProximo = carrosselLista.siblings('.carrossel-customizado-btn-proximo').attr('class');
    if (['bloco', 'infinito'].every(classe => classesBtnProximo.split(' ').includes(classe))) {
        atualizarCarrosselInfinitoItensVisiveisConformeDirecaoMovimentada(carrosselLista, carrosselItensTranslateXMovimentado, true);
    } else if (classesBtnProximo.includes('bloco')) {
        if (!validarLimiteMovimentado(carrosselLista, carrosselItens, carrosselItensTranslateXMovimentado)) return;
    } else if (classesBtnProximo.includes('infinito')) {
        atualizarCarrosselInfinitoItensVisiveisConformeDirecaoMovimentada(carrosselLista, carrosselItensTranslateXMovimentado, false);
    } else {
        if (!validarLimiteMovimentado(carrosselLista, carrosselItens, carrosselItensTranslateXMovimentado)) return;
    }

    carrosselLista.find('.carrossel-customizado-item').css({ 'transform': `translateX(${carrosselItensTranslateXMovimentado}px)` });
});

$(document).on('mouseup touchend', (evento) => {
    if (!arrastando) return;
    arrastando = false;
    animandoCarrosselItem = true;

    const containerAtual = $(evento.currentTarget).find('.carrossel-customizado-btn-proximo.arrastavel.arrastando').closest('.carrossel-customizado-container');
    const classesBtnProximo = containerAtual.find('.carrossel-customizado-btn-proximo').attr('class');

    if (['bloco', 'infinito'].every(classe => classesBtnProximo.split(' ').includes(classe))) {
        arrastarCarrosselItem(containerAtual, buscarTranslateXAtualizadoCarrosselItemInfinitoBloco);
    } else if (classesBtnProximo.includes('bloco')) {
        arrastarCarrosselItem(containerAtual, buscarTranslateXAtualizadoCarrosselItemFinitoBloco);
    } else if (classesBtnProximo.includes('infinito')) {
        arrastarCarrosselItem(containerAtual, buscarTranslateXAtualizadoCarrosselItemInfinito);
    } else {
        arrastarCarrosselItem(containerAtual, buscarTranslateXAtualizadoCarrosselItemFinito);
    }
});

$('.carrossel-customizado-lista:has(+.carrossel-customizado-btn-proximo.arrastavel) .carrossel-customizado-item *').on('click', (evento) => {//evitar click quando arrastar um item clicavel
    if (carrosselItemTranslateXModificado) {
        evento.preventDefault();
    }
});
// eventos arrastavel fim //

