/**
*
* create by @snhasani - Sunday 26 April 2015
*
**/


(function(window, document, undefined) {

    var model = {
        lastId: 0,
        pizzas: {}
    };

    var octopus = {

        init : function() {
            view.init();
        },

        setCurrentPizza : function(pizza) {
           model.currentPizza = pizza;
        },

        getCurrentPizza : function() {
            return model.currentPizza;
        },

        addOrder : function() {
            var lastId = ++model.lastId;
            var currentPizza = {
                id: lastId,
                visiable: true
            };

            model.pizzas[lastId] = currentPizza;

            view.render([currentPizza]);
        },

        removeOrder : function(id) {
            model.pizzas[id].visiable = false;
        }
    };

    var view = {

        init : function() {

            this.orderBtn =
                document.getElementsByClassName('order__btn');

            this.pizzaListWrapper =
                document.getElementsByClassName('pizza-list');

            this.template =
                document.querySelector('script[data-template]').innerHTML;

            this.orderBtn[0].addEventListener('click', function() {
                octopus.addOrder();
            });

            this.render();
        },

        render : function(pizzas) {
            var i, len, elem;
            pizzas = pizzas || [];
            len = pizzas.length;

            if (len) {

                elem = document.createElement('li');
                elem.setAttribute('class', 'pizza');

                for(i = 0; i < len; i++){
                    var currentPizza = pizzas[i];

                    elem.setAttribute('data-id', currentPizza.id);
                    elem.innerHTML = utils.twt(this.template, currentPizza);

                    elem.addEventListener('click', (function(pizzaCopy) {
                        return function() {
                            octopus.removeOrder(pizzaCopy.id);
                            elem.remove();
                        }
                    })(currentPizza));

                    this.pizzaListWrapper[0].appendChild(elem);
                }
            } else {
                this.pizzaListWrapper[0].innerHTML = '';
            }
        }
    };

    /*=============================
    =          Utilities          =
    =============================*/

    var utils = {
        twt : function(t, d) {
            var s = t;
            for(var p in d) {
                s = s.replace(new RegExp('{'+p+'}','g'), d[p]);
            }
            return s;
        }
    }

    /*---  End of Utilities  ---*/


    window.addEventListener('DOMContentLoaded', octopus.init, false);

})(window, document);