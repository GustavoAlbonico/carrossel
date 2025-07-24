const btnsProximos = $('.carrossel-customizado-btn-proximo:not(.infinito):not(.bloco)');
const btnsAnteriores = $('.carrossel-customizado-btn-anterior:not(.infinito):not(.bloco)');
const btnsProximosInfinito = $('.carrossel-customizado-btn-proximo.infinito:not(.bloco)');
const btnsAnterioresInfinito = $('.carrossel-customizado-btn-anterior.infinito:not(.bloco)');
const btnsProximosBloco = $('.carrossel-customizado-btn-proximo.bloco:not(.infinito)');
const btnsAnterioresBloco = $('.carrossel-customizado-btn-anterior.bloco:not(.infinito)');
const btnsProximosInfinitoBloco = $('.carrossel-customizado-btn-proximo.infinito.bloco');
const btnsAnterioresInfinitoBloco = $('.carrossel-customizado-btn-anterior.infinito.bloco');

const carrosseisArrastaveisLista = $('.carrossel-customizado-btn-proximo.arrastavel').prev('.carrossel-customizado-lista');

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

const atualizarCounterCarrosselItem = (carrosselLista) => {
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

let arrastando = false;
let posicaoInicialEixoX;
let posicaoScrollAtual;

carrosseisArrastaveisLista.on('mousedown touchstart', function (evento) {
    if (evento.target.classList.contains('carrossel-customizado-lista')) return;
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

    const containerAtual = $(evento.currentTarget).find('.carrossel-customizado-btn-proximo.arrastavel.arrastando').closest('.carrossel-customizado-container');
    const carrosselLista = containerAtual.find('.carrossel-customizado-lista');
    const carrosselListaRect = carrosselLista.get(0).getBoundingClientRect();

    carrosselLista.find('.carrossel-customizado-item').each(async (index, item) => {
        const carrosselCustomizadoItem = $(item);
        const carrosselCustomizadoItemRect = await carrosselCustomizadoItem.get(0).getBoundingClientRect();//para pegar a possição em tempo real mesmo com translate

        //a movimentação tem que ser feita aqui antes de adicionar a classe

        console.log(carrosselCustomizadoItemRect.left, carrosselCustomizadoItemRect.right, carrosselListaRect.left, carrosselListaRect.right);
        if (carrosselCustomizadoItemRect.left >= carrosselListaRect.left && carrosselCustomizadoItemRect.left <= carrosselListaRect.right) {
            carrosselCustomizadoItem.addClass('destaque');
        } else {
            carrosselCustomizadoItem.removeClass('destaque');
        }

    });
    
    carrosselLista.find('.carrossel-customizado-item').css('transform', ``);
    atualizarCounterCarrosselItem(containerAtual.find('.carrossel-customizado-lista'));
    containerAtual.find('.carrossel-customizado-btn-proximo.arrastavel').removeClass('arrastando');
    
    setTimeout(() => {
        const carrosselAnimationDuration = containerAtual.css('--carrossel-animation-duration');
        carrosselLista.find('.carrossel-customizado-item').css('transition', `${carrosselAnimationDuration} ease-in-out`);
    },50);//tempo para não pegar a animação ao voltar

    // const carrosselQuantidadeItensVisiveis = containerAtual.css('--carrossel-itens-visiveis');
    // const carrosselBotaoNavegacaoTamanho = parseInt(containerAtual.css('--carrossel-botao-navegacao-tamanho'));
    // const carrosselItensGap = parseInt(containerAtual.css('--carrossel-itens-gap'));
});

carrosseisArrastaveisLista.on('mousemove touchmove', function (evento) {
    if (!arrastando) return;
    evento.preventDefault();

    const carrosselLista = $(evento.currentTarget);
    const posicaoAtualEixoX = (evento.pageX || evento.originalEvent.touches[0].pageX) - carrosselLista.offset().left;
    const distanciaArrastada = (posicaoAtualEixoX - posicaoInicialEixoX) * 1;

    carrosselLista.find('.carrossel-customizado-item').css({'transform': `translateX(${distanciaArrastada}px)`});
});