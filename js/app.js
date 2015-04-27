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

        addOrder : function() {
            var lastId = ++model.lastId;
            var pizza = {
                id: lastId,
                visiable: true
            };
            model.pizzas[lastId] = pizza;
            view.render(pizza);
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

        render : function(pizza) {
            var elem;
            pizza = pizza || {};

            if (Object.keys(pizza).length) {

                elem = document.createElement('li');
                elem.setAttribute('class', 'pizza');

                elem.setAttribute('data-id', pizza.id);
                elem.innerHTML =
                    this.template.replace(/{id}/g, pizza.id);

                this.pizzaListWrapper[0].appendChild(elem);

                elem.children[1]
                    .addEventListener('click', (function(pizzaCopy) {
                        return function(e) {
                            octopus.removeOrder(pizzaCopy.id);
                            elem.remove();
                        }
                    })(pizza));

            } else {
                this.pizzaListWrapper[0].innerHTML = '';
            }
        }
    };

    window.addEventListener('DOMContentLoaded', octopus.init, false);

})(window, document);