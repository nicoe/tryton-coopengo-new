/* This file is part of Tryton.  The COPYRIGHT file at the top level of
   this repository contains the full copyright notices and license terms. */

(function() {
    'use strict';

    class _UserMenu {
        constructor() {
            this.user_name = null;
            this.user_login = null;
            this.user_card = [];
            this.avatar_url = null;
            this.avatar_badge_url = null;
        }

        update_information(data) {
            if (data.name) {
                this.user_name = data.name;
            }
            if (data.login) {
                this.user_login = data.login;
            }
            if (data.user_card) {
                this.user_card = data.user_card;
            }
            if (data.avatar_url) {
                this.avatar_url = data.avatar_url;
            }
            if (data.avatar_badge_url) {
                this.avatar_badge_url = data.avatar_badge_url;
            }
        }

        empty() {
            let user_preferences = jQuery('#user-preferences');
            user_preferences.empty();
            user_preferences.removeClass('open');
        }

        update() {
            let user_preferences = jQuery('#user-preferences');
            user_preferences.empty();

            var user = jQuery('<a/>', {
                'href': '#',
                'class': 'dropdown-toggle',
                'data-toggle': 'dropdown',
                'role': 'button',
                'aria-expanded': false,
                'aria-haspopup': true,
                'title': this.user_name,
            });
            user_preferences
                .off('show.bs.dropdown')
                .on('show.bs.dropdown', () => {
                    Sao.NotificationMenu.fill();
                    Sao.NotificationMenu.indicator.sao_hide();
                })
                .prepend(user);
            if (this.avatar_badge_url) {
                user.prepend(jQuery('<img/>', {
                    'src': this.avatar_badge_url + '?s=15',
                    'class': 'img-circle img-badge',
                }));
            }
            if (this.avatar_url) {
                user.prepend(jQuery('<img/>', {
                    'src': this.avatar_url + '?s=30',
                    'class': 'img-circle',
                }));
            }
            user.prepend(Sao.NotificationMenu.indicator);

            let user_menu = jQuery('<ul/>', {
                'class': 'dropdown-menu',
                'role': 'menu',
            }).appendTo(user_preferences);
            let user_card = jQuery('<div/>', {
                'class': 'user-card',
            }).appendTo(
                jQuery('<li/>', {
                'role': 'presentation',
                }).appendTo(user_menu));
            let user_infos = jQuery('<div/>')
                .append(jQuery('<p/>', {'class': 'name'}).text(this.user_name))
                .append(jQuery('<p/>', {
                    'class': 'text-muted',
                }).text(this.user_login))
                .appendTo(user_card);
            if (this.user_card.length > 0) {
                this.user_card.forEach((item) => {
                    let info = jQuery('<p/>', {
                        'title': item[1],
                    }).text(item[1]);
                    let icon;
                    if (item[0].length > 0) {
                        icon = item[0];
                    } else {
                        icon = 'tryton-info';
                    }
                    let img = jQuery('<img/>', {
                        'class': 'icon',
                    })
                    info.prepend(img);
                    Sao.common.ICONFACTORY.get_icon_url(icon).then((url) => {
                        img.attr('src', url);
                        info.appendTo(user_infos);
                    });
                });
            }
            if (this.avatar_url) {
                user_card.append(jQuery('<img/>', {
                    'src': this.avatar_url + '?s=64',
                    'class': 'img-circle',
                }));
            }

            user_menu.append(
                jQuery('<li/>', {
                }).append(Sao.NotificationMenu.el));
            user_menu.append(
                jQuery('<li/>', {
                    'role': 'separator',
                    'class': 'divider',
                }));
            let items = [
                {
                    'text': Sao.i18n.gettext("Preferences..."),
                    'icon': 'tryton-launch',
                    'action': () => Sao.preferences(),
                },
                {
                    'text': Sao.i18n.gettext("Help..."),
                    'icon': 'tryton-question',
                    'action': () => Sao.help_dialog(),
                },
                {
                    'text': Sao.i18n.gettext("Logout"),
                    'icon': 'tryton-exit',
                    'action': () => Sao.logout(),
                },
            ];

            items.forEach((item) => {
                let item_img = jQuery('<img/>', {
                    'class': 'icon',
                });
                Sao.common.ICONFACTORY.get_icon_url(item.icon)
                    .then(url => {
                        item_img.attr('src', url);
                    });
                let item_li = jQuery('<li/>', {
                    'class': 'notification-item',
                    'role': 'presentation',
                }).append(
                    jQuery('<a/>', {
                        'role': 'menuitem',
                        'href': '#',
                        'text': item.text,
                    }).prepend(item_img
                    ).click((evt) => {
                        evt.preventDefault();
                        item.action();
                    }));
                user_menu.append(item_li);
            });
        }
    }

    Sao.UserMenu = new _UserMenu();
}());
