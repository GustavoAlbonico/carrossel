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

    const carrosselItensDestaque = $('.carrossel-customizado-btn-proximo').closest('.carrossel-customizado-container').find('.carrossel-customizado-lista .carrossel-customizado-item.destaque');
    carrosselItensDestaque.find('a').removeAttr('tabindex');
    if (novaLargura < 1024) return;
    const carrosselItensSemDestaque = $('.carrossel-customizado-btn-proximo').closest('.carrossel-customizado-container').find('.carrossel-customizado-lista .carrossel-customizado-item:not(.destaque)');
    carrosselItensSemDestaque.find('a').prop('tabindex', '-1');
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

        const carrosselItensFaltantes = carrosselQuantidadeItensVisiveis - (carrosselItens.length % carrosselQuantidadeItensVisiveis);
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

$(window).on('resize', function () {
    atualizarAcessibilidadeCarrossel();
});

