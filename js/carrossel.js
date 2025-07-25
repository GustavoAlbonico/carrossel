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

    const carroselItensDestaque = $('.carrossel-customizado-btn-proximo').closest('.carrossel-customizado-container').find('.carrossel-customizado-lista .carrossel-customizado-item.destaque');
    carroselItensDestaque.find('a').removeAttr('tabindex');
    if (novaLargura < 1024) return;
    const carroselItensSemDestaque = $('.carrossel-customizado-btn-proximo').closest('.carrossel-customizado-container').find('.carrossel-customizado-lista .carrossel-customizado-item:not(.destaque)');
    carroselItensSemDestaque.find('a').prop('tabindex', '-1');
}

const verificarQuantidadeItensCarrossel = (carrosselContainer, carroselItensTamanho, carrosselQuantidadeItensVisiveis) => {
    if (carroselItensTamanho > carrosselQuantidadeItensVisiveis) return;

    $(carrosselContainer).find(`.carrossel-customizado-lista`).css({ justifyContent: 'center' })
    $(carrosselContainer).find(`.carrossel-customizado-lista`).next('.carrossel-customizado-btn-proximo').css({ display: 'none' });
    $(carrosselContainer).find(`.carrossel-customizado-lista`).prev('.carrossel-customizado-btn-anterior').css({ display: 'none' });
}

const atualizarCounterCarrosselItem = async (carrosselLista) => {
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

        const carroselItensFaltantes = carrosselQuantidadeItensVisiveis - (carrosselItens.length % carrosselQuantidadeItensVisiveis);
        for (let posicao = 0; posicao < carroselItensFaltantes; posicao++) {
            carrosselLista.append(carrosselItens.last().clone().css({ display: 'none', visibility: 'hidden', opacity: 0 }));
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

btnsProximos.on('click', (evento) => {
    const carroselLista = $(evento.target).prev('.carrossel-customizado-lista')
    const carroselItensDestaque = carroselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');

    if (carroselItensDestaque.last().next().length < 1) return;
    if (carroselItensDestaque.hasClass('proximo')) return;

    carroselItensDestaque.addClass('proximo');
    carroselItensDestaque.last().next().addClass('proximo');
    carroselItensDestaque.first().prev().addClass('proximo');

    setTimeout(() => {
        carroselLista.find('.carrossel-customizado-item.proximo').removeClass('proximo');
        carroselItensDestaque.first().removeClass('destaque');
        carroselItensDestaque.last().next().addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).prev('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));

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

    if (carroselItensDestaque.first().prev().length < 1) return;
    if (carroselItensDestaque.hasClass('anterior')) return;

    carroselItensDestaque.addClass('anterior');
    carroselItensDestaque.last().next().addClass('anterior');
    carroselItensDestaque.first().prev().addClass('anterior');

    setTimeout(() => {
        carroselLista.find('.carrossel-customizado-item.anterior').removeClass('anterior');
        carroselItensDestaque.last().removeClass('destaque');
        carroselItensDestaque.first().prev().addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).next('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));


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

    if (carroselItensDestaque.hasClass('proximo')) return;

    const carroselItens = carroselLista.find('.carrossel-customizado-item');
    if (carroselItensDestaque.last().next().length < 1) {
        carroselLista.append(carroselItens.first());
        atualizarCounterCarrosselItem($(evento.target).prev('.carrossel-customizado-lista'));
    }

    carroselItensDestaque.addClass('proximo');
    carroselItensDestaque.last().next().addClass('proximo');
    carroselItensDestaque.first().prev().addClass('proximo');

    setTimeout(() => {
        carroselLista.find('.carrossel-customizado-item.proximo').removeClass('proximo');
        carroselItensDestaque.first().removeClass('destaque');
        carroselItensDestaque.last().next().addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).prev('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));
});

btnsAnterioresInfinito.on('click', (evento) => {
    const carroselLista = $(evento.target).next('.carrossel-customizado-lista');
    const carroselItensDestaque = carroselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');

    if (carroselItensDestaque.hasClass('anterior')) return;

    const carroselItens = carroselLista.find('.carrossel-customizado-item');
    if (carroselItensDestaque.first().prev().length < 1) {
        carroselLista.prepend(carroselItens.last());
        atualizarCounterCarrosselItem($(evento.target).next('.carrossel-customizado-lista'));
    }

    carroselItensDestaque.addClass('anterior');
    carroselItensDestaque.last().next().addClass('anterior');
    carroselItensDestaque.first().prev().addClass('anterior');

    setTimeout(() => {
        carroselLista.find('.carrossel-customizado-item.anterior').removeClass('anterior');
        carroselItensDestaque.last().removeClass('destaque');
        carroselItensDestaque.first().prev().addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).next('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));
});

btnsProximosBloco.on('click', (evento) => {
    const carroselLista = $(evento.target).prev('.carrossel-customizado-lista');
    const carroselItensDestaque = carroselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');
    const carrosselQuantidadeItensVisiveis = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis');

    if (carroselItensDestaque.last().nextAll().length < 1) return;
    if (carroselItensDestaque.hasClass('proximo-bloco')) return;

    carroselItensDestaque.addClass('proximo-bloco');
    carroselItensDestaque.last().nextAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('proximo-bloco');

    setTimeout(() => {
        carroselItensDestaque.removeClass('destaque');
        carroselLista.find('.carrossel-customizado-item.proximo-bloco').removeClass('proximo-bloco');
        carroselItensDestaque.last().nextAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).prev('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));

    if (carroselItensDestaque.last().nextAll().slice(carrosselQuantidadeItensVisiveis, carrosselQuantidadeItensVisiveis * 2).length < 1) {
        $(evento.target).addClass('carrossel-customizado-btn-disabled');
    }

    if ($(evento.target).siblings('.carrossel-customizado-btn-anterior').hasClass('carrossel-customizado-btn-disabled')) {
        $(evento.target).siblings('.carrossel-customizado-btn-anterior').removeClass('carrossel-customizado-btn-disabled');
    }
});

btnsAnterioresBloco.on('click', (evento) => {
    const carroselLista = $(evento.target).next('.carrossel-customizado-lista');
    const carroselItensDestaque = carroselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');
    const carrosselQuantidadeItensVisiveis = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis');

    if (carroselItensDestaque.first().prevAll().length < 1) return;
    if (carroselItensDestaque.hasClass('anterior-bloco')) return;

    carroselItensDestaque.addClass('anterior-bloco');
    carroselItensDestaque.first().prevAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('anterior-bloco');

    setTimeout(() => {
        carroselItensDestaque.removeClass('destaque');
        carroselLista.find('.carrossel-customizado-item.anterior-bloco').removeClass('anterior-bloco');
        carroselItensDestaque.first().prevAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).next('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));

    if (carroselItensDestaque.first().prevAll().slice(carrosselQuantidadeItensVisiveis, carrosselQuantidadeItensVisiveis * 2).length < 1) {
        $(evento.target).addClass('carrossel-customizado-btn-disabled');
    }

    if ($(evento.target).siblings('.carrossel-customizado-btn-proximo').hasClass('carrossel-customizado-btn-disabled')) {
        $(evento.target).siblings('.carrossel-customizado-btn-proximo').removeClass('carrossel-customizado-btn-disabled');
    }
});

btnsProximosInfinitoBloco.on('click', (evento) => {
    const carroselLista = $(evento.target).prev('.carrossel-customizado-lista');
    const carroselItensDestaque = carroselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');
    const carrosselQuantidadeItensVisiveis = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis');

    if (carroselItensDestaque.hasClass('proximo-bloco')) return;

    const carroselItens = carroselLista.find('.carrossel-customizado-item');
    if (carroselItensDestaque.last().nextAll().length < carrosselQuantidadeItensVisiveis) {
        carroselLista.append(carroselItens.slice(0, carrosselQuantidadeItensVisiveis));
        atualizarCounterCarrosselItem($(evento.target).prev('.carrossel-customizado-lista'));
    }

    carroselItensDestaque.addClass('proximo-bloco');
    carroselItensDestaque.last().nextAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('proximo-bloco');

    setTimeout(() => {
        carroselItensDestaque.removeClass('destaque');
        carroselLista.find('.carrossel-customizado-item.proximo-bloco').removeClass('proximo-bloco');
        carroselItensDestaque.last().nextAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).prev('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));

});

btnsAnterioresInfinitoBloco.on('click', (evento) => {
    const carroselLista = $(evento.target).next('.carrossel-customizado-lista');
    const carroselItensDestaque = carroselLista.find('.carrossel-customizado-item.destaque');
    const carrosselAnimationDuration = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-animation-duration');
    const carrosselQuantidadeItensVisiveis = carroselLista.closest('.carrossel-customizado-container').css('--carrossel-itens-visiveis');

    if (carroselItensDestaque.hasClass('anterior-bloco')) return;

    const carroselItens = carroselLista.find('.carrossel-customizado-item');
    if (carroselItensDestaque.first().prevAll().length < carrosselQuantidadeItensVisiveis) {
        carroselLista.prepend(carroselItens.slice(carroselItens.length - carrosselQuantidadeItensVisiveis, carroselItens.length));
        atualizarCounterCarrosselItem($(evento.target).next('.carrossel-customizado-lista'));
    }

    carroselItensDestaque.addClass('anterior-bloco');
    carroselItensDestaque.first().prevAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('anterior-bloco');

    setTimeout(() => {
        carroselItensDestaque.removeClass('destaque');
        carroselLista.find('.carrossel-customizado-item.anterior-bloco').removeClass('anterior-bloco');
        carroselItensDestaque.first().prevAll().slice(0, carrosselQuantidadeItensVisiveis).addClass('destaque');
        atualizarCounterCarrosselItem($(evento.target).next('.carrossel-customizado-lista'));

        atualizarAcessibilidadeCarrossel();
    }, parseInt(carrosselAnimationDuration));

});

$(document).ready(() => {
    adicionarCarrosselItensEmDestaque();
    atualizarAcessibilidadeCarrossel();
});

$(window).on('resize', function () {
    atualizarAcessibilidadeCarrossel();
});

