/* SCRIPT CRIADO POR JEAN C. P. RODRIGUES */
(function () {
    'use strict';

    /* VARIAVEIS DE AMBIENTE */
    let displayMain = '#displayHistoryCalculadoraV1';

    /* SELETOR SIMPLES PADRAO */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /* EVENTO DE LISTAGEM SIMPLES PADRAO */
    const on = (type, el, listener, all = true) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    const validKey = (value) => {

        /* APAGAR TUDO DENTRO DA DISPLAY MAIN */
        if (value == 'CE' || value == 'C') {
            clearAllDisplayMain();
            return;
        }

        insertNumDisplayMain(value);

    }

    /* LIMPA O DISPLAY PRINCIPAL */
    const clearAllDisplayMain = () => {
        let mainInputDisplay = select(displayMain);
        mainInputDisplay.value = 0
    }

    /* INSERE UM NUMERO NO DISPLAY PRINCIPAL */
    const insertNumDisplayMain = (value) => {
        let mainInputDisplay = select(displayMain);
        let valueInputLast = mainInputDisplay.value;
        let splitValueInputLast = valueInputLast.split('');

        // VERIFICA SE O NUMERO COMEÇA COM ZERO
        if (valueInputLast == 0) {
            mainInputDisplay.value = value;
        } else {
            mainInputDisplay.value = valueInputLast += value;
        }

    }

    /* VERIFICA SE O VALOR E UM NUMERO INTEIRO */
    const backspaceDisplayMain = (value) => {

        

        console.log(typeValInt, typeValFloat)

    }

    /* AO SELECIONAR O BOTAO */
    /* APENAS BOTOES COM OS ATRIBUTOS [DATA-MATH] SERAO ACEITOS */
    on('click', '.btn', function (e) {
        let keyMath = this.getAttribute('data-math');
        if (keyMath) { validKey(keyMath) }
    });

    /* AO PRESSIONAR O TECLADO */
    window.addEventListener('keypress', (e) => {

        let isTrusted, altKey, charCode, code,
            ctrlKey, key, keyCode, shiftKey;
        isTrusted = e.isTrusted;
        altKey = e.altKey;
        charCode = e.charCode;
        code = e.code;
        ctrlKey = e.ctrlKey;
        key = e.key;
        keyCode = e.keyCode;
        shiftKey = e.shiftKey;

        let numPress = parseInt(key)

        if (numPress && numPress >= 0 || numPress <= 9) {
            validKey(numPress);
        }

    });

    /* AO PRESSIONAR QUALQUER TECLAS COM OBJETIVO [BACKSPACE] */
    window.addEventListener('keyup', (e) => {

        let isTrusted, altKey, charCode, code,
            ctrlKey, key, keyCode, shiftKey;
        isTrusted = e.isTrusted;
        altKey = e.altKey;
        charCode = e.charCode;
        code = e.code;
        ctrlKey = e.ctrlKey;
        key = e.key;
        keyCode = e.keyCode;
        shiftKey = e.shiftKey;

        if (key == 'Backspace') {
            console.log('Apagado')
        }

    });

})()