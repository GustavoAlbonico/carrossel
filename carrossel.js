const btnsProximos = $('.carrossel-customizado-btn-proximo:not(.infinito):not(.bloco)');
const btnsAnteriores = $('.carrossel-customizado-btn-anterior:not(.infinito):not(.bloco)');
const btnsProximosInfinito = $('.carrossel-customizado-btn-proximo.infinito:not(.bloco)');
const btnsAnterioresInfinito = $('.carrossel-customizado-btn-anterior.infinito:not(.bloco)');

const btnsProximosBloco = $('.carrossel-customizado-btn-proximo.bloco:not(.infinito)');
const btnsAnterioresBloco = $('.carrossel-customizado-btn-anterior.bloco:not(.infinito)');
const btnsProximosInfinitoBloco = $('.carrossel-customizado-btn-proximo.infinito.bloco');
const btnsAnterioresInfinitoBloco = $('.carrossel-customizado-btn-anterior.infinito.bloco');

const atualizarAcessibilidadeCarrossel = () => {
    const novaLargura = $(window).width();

    if (novaLargura < 1024) {
        const carroselItens = $('.carrossel-customizado-btn-proximo').closest('.carrossel-customizado-container').find('.carrossel-customizado-lista .carrossel-customizado-item');
        carroselItens.find('a').removeAttr('tabindex');
    } else {
        const carroselItensSemDestaque = $('.carrossel-customizado-btn-proximo').closest('.carrossel-customizado-container').find('.carrossel-customizado-lista .carrossel-customizado-item:not(.destaque)');
        carroselItensSemDestaque.find('a').prop('tabindex', '-1');
    }
}

const atualizarIndexCarrosselItemBloco = (carrosselLista) => {
    const carroselItensDestaque = carrosselLista.find('.carrossel-customizado-item.destaque');

    carroselItensDestaque.each((index, item) => {
        $(item).get(0).style.removeProperty('--carrossel-item-counter');
    });
    carroselItensDestaque.last().nextAll().each((index, item) => {
        $(item).get(0).style.setProperty('--carrossel-item-counter', index + 1);
    });
    carroselItensDestaque.first().prevAll().get().forEach((item, index) => {
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
                $(item).find('a').eq(index).prop('tabindex', '-1');
            }
        });

        if (carrosselItens.length <= carrosselQuantidadeItensVisiveis) {
            $(container).find(`.carrossel-customizado-lista`).next('.carrossel-customizado-btn-proximo').css({ display: 'none' });
            $(container).find(`.carrossel-customizado-lista`).prev('.carrossel-customizado-btn-anterior').css({ display: 'none' });
        }
    });

    btnsProximosInfinito.closest('.carrossel-customizado-container').each((index, container) => {
        const carrosselQuantidadeItensVisiveis = +$(container).css('--carrossel-itens-visiveis');
        $(container).find(`.carrossel-customizado-lista`).find('.carrossel-customizado-item').each((index, item) => {
            if (index < carrosselQuantidadeItensVisiveis) {
                $(item).addClass('destaque');
            }
        });

        const ultimoCarrosselItem = $(container).find(`.carrossel-customizado-lista`).find('.carrossel-customizado-item').last();
        $(container).find(`.carrossel-customizado-lista`).prepend(ultimoCarrosselItem);
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

        const carroselItensFaltantes = carrosselQuantidadeItensVisiveis - (carrosselItens.length % carrosselQuantidadeItensVisiveis);
        for (let posicao = 0; posicao < carroselItensFaltantes; posicao++) {
            carrosselLista.append(carrosselItens.last().clone().css({ visibility: 'hidden', opacity: 0 }));
        }
    });
}

btnsProximos.on('click', (evento) => {
    const carroselLista = $(evento.target).prev('.carrossel-customizado-lista')
    const carroselItensDestaque = carroselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');

    if (carroselItensDestaque.last().next().length < 1) {
        return;
    }

    if (!carroselItensDestaque.hasClass('proximo')) {
        carroselItensDestaque.addClass('proximo');
        carroselItensDestaque.last().next().addClass('proximo');
        carroselItensDestaque.first().prev().addClass('proximo');

        setTimeout(() => {
            carroselLista.find('.carrossel-customizado-item.proximo').removeClass('proximo');
            carroselItensDestaque.first().removeClass('destaque').find('a').prop('tabindex', '-1');
            carroselItensDestaque.last().next().addClass('destaque').find('a').removeAttr('tabindex');


        }, parseInt(carrosselAnimationDuration));
    }

    if (carroselItensDestaque.last().next().next().length < 1) {
        $(evento.target).addClass('carrossel-customizado-btn-disabled');
    }

    if ($(evento.target).siblings('.carrossel-customizado-btn-anterior').hasClass('carrossel-customizado-btn-disabled')) {
        $(evento.target).siblings('.carrossel-customizado-btn-anterior').removeClass('carrossel-customizado-btn-disabled');
    }
});

btnsAnteriores.on('click', (evento) => {
    const carroselLista = $(evento.target).next('.carrossel-customizado-lista')
    const carroselItensDestaque = carroselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');

    if (carroselItensDestaque.first().prev().length < 1) {
        return;
    }

    if (!carroselItensDestaque.hasClass('anterior')) {
        carroselItensDestaque.addClass('anterior');
        carroselItensDestaque.last().next().addClass('anterior');
        carroselItensDestaque.first().prev().addClass('anterior');
        setTimeout(() => {
            carroselLista.find('.carrossel-customizado-item.anterior').removeClass('anterior');
            carroselItensDestaque.last().removeClass('destaque').find('a').prop('tabindex', '-1');
            carroselItensDestaque.first().prev().addClass('destaque').find('a').removeAttr('tabindex');
        }, parseInt(carrosselAnimationDuration));
    }

    if (carroselItensDestaque.first().prev().prev().length < 1) {
        $(evento.target).addClass('carrossel-customizado-btn-disabled');
    }

    if ($(evento.target).siblings('.carrossel-customizado-btn-proximo').hasClass('carrossel-customizado-btn-disabled')) {
        $(evento.target).siblings('.carrossel-customizado-btn-proximo').removeClass('carrossel-customizado-btn-disabled');
    }
});

btnsProximosInfinito.on('click', (evento) => {
    const carroselLista = $(evento.target).prev('.carrossel-customizado-lista');
    const carroselItensDestaque = carroselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');

    if (!carroselItensDestaque.hasClass('proximo')) {
        carroselItensDestaque.addClass('proximo');
        carroselItensDestaque.last().next().addClass('proximo');
        carroselItensDestaque.first().prev().addClass('proximo');

        setTimeout(() => {
            carroselLista.find('.carrossel-customizado-item.proximo').removeClass('proximo');
            carroselItensDestaque.last().next().addClass('destaque');

            if (carroselItensDestaque.first().prev().length > 0) {
                carroselLista.append(carroselItensDestaque.first().prev());
                carroselLista.prepend(carroselItensDestaque.first().removeClass('destaque'));
                return;
            }

            carroselItensDestaque.first().removeClass('destaque');

        }, parseInt(carrosselAnimationDuration));
    }
});

btnsAnterioresInfinito.on('click', (evento) => {
    const carroselLista = $(evento.target).next('.carrossel-customizado-lista');
    const carroselItensDestaque = carroselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');

    if (!carroselItensDestaque.hasClass('anterior')) {
        carroselItensDestaque.addClass('anterior');
        carroselItensDestaque.last().next().addClass('anterior');
        carroselItensDestaque.first().prev().addClass('anterior');
        setTimeout(() => {
            carroselLista.find('.carrossel-customizado-item.anterior').removeClass('anterior');
            carroselItensDestaque.first().prev().addClass('destaque');
            carroselItensDestaque.last().removeClass('destaque');
            carroselLista.prepend(carroselLista.find('.carrossel-customizado-item').last());

        }, parseInt(carrosselAnimationDuration));
    }
});

btnsProximosInfinitoBloco.on('click', (evento) => {
    const carroselLista = $(evento.target).prev('.carrossel-customizado-lista');
    const carroselItensDestaque = carroselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');
    const carrosselQuantidadeItensVisiveis = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis');
    if (!carroselItensDestaque.hasClass('proximo-bloco')) {

        const carroselItens = carroselLista.find('.carrossel-customizado-item');
        if (carroselItensDestaque.nextAll().length < carrosselQuantidadeItensVisiveis) {
            carroselLista.append(carroselItens.slice(0, carrosselQuantidadeItensVisiveis));
            atualizarIndexCarrosselItemBloco($(evento.target).prev('.carrossel-customizado-lista'));
        }

        carroselItensDestaque.addClass('proximo-bloco');
        carroselItensDestaque.last().nextAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('proximo-bloco');

        setTimeout(() => {
            carroselItensDestaque.removeClass('destaque');
            carroselLista.find('.carrossel-customizado-item.proximo-bloco').removeClass('proximo-bloco');
            carroselItensDestaque.last().nextAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('destaque');
            atualizarIndexCarrosselItemBloco($(evento.target).prev('.carrossel-customizado-lista'));

        }, parseInt(carrosselAnimationDuration));
    }
});

btnsAnterioresInfinitoBloco.on('click', (evento) => {
    const carroselLista = $(evento.target).next('.carrossel-customizado-lista');
    const carroselItensDestaque = carroselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');
    const carrosselQuantidadeItensVisiveis = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis');
    if (!carroselItensDestaque.hasClass('anterior-bloco')) {

        const carroselItens = carroselLista.find('.carrossel-customizado-item');
        if (carroselItensDestaque.prevAll().length < carrosselQuantidadeItensVisiveis) {
            carroselLista.prepend(carroselItens.slice(carroselItens.length - carrosselQuantidadeItensVisiveis, carroselItens.length));
            atualizarIndexCarrosselItemBloco($(evento.target).next('.carrossel-customizado-lista'));
        }

        carroselItensDestaque.addClass('anterior-bloco');
        carroselItensDestaque.first().prevAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('anterior-bloco');

        setTimeout(() => {
            carroselItensDestaque.removeClass('destaque');
            carroselLista.find('.carrossel-customizado-item.anterior-bloco').removeClass('anterior-bloco');
            carroselItensDestaque.first().prevAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('destaque');
            atualizarIndexCarrosselItemBloco($(evento.target).next('.carrossel-customizado-lista'));

        }, parseInt(carrosselAnimationDuration));
    }
});

$(document).ready(() => {
    adicionarCarrosselItensEmDestaque();
    atualizarAcessibilidadeCarrossel();
});

$(window).on('resize', function () {
    atualizarAcessibilidadeCarrossel();
});
