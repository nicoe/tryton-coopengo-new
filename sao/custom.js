(function() {
    Sao.config.mount_point = '/sao';

    var _md_svg = function(inner) {
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"' +
            ' width="16" height="16" fill="none" stroke="currentColor"' +
            ' stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            inner + '</svg>';
    };
    var MD_ICONS = {
        undo: _md_svg('<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>'),
        redo: _md_svg('<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>'),
        bold: _md_svg('<path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8z"/>'),
        italic: _md_svg('<line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/>'),
        strike: _md_svg('<path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/>'),
        underline: _md_svg('<path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/>'),
        code: _md_svg('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),
        h1: _md_svg('<path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="m17 12 3-2v8"/>'),
        h2: _md_svg('<path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1"/>'),
        h3: _md_svg('<path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2"/><path d="M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2"/>'),
        bulletList: _md_svg('<line x1="9" x2="20" y1="6" y2="6"/><line x1="9" x2="20" y1="12" y2="12"/><line x1="9" x2="20" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>'),
        orderedList: _md_svg('<line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>'),
        taskList: _md_svg('<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><line x1="13" x2="21" y1="8" y2="8"/><line x1="13" x2="21" y1="16" y2="16"/>'),
        blockquote: _md_svg('<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>'),
        codeBlock: _md_svg('<rect width="20" height="20" x="2" y="2" rx="2" ry="2"/><path d="m10 10-2 2 2 2"/><path d="m14 14 2-2-2-2"/>'),
        table: _md_svg('<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="3" x2="21" y1="15" y2="15"/><line x1="9" x2="9" y1="3" y2="21"/><line x1="15" x2="15" y1="3" y2="21"/>'),
        hr: _md_svg('<line x1="5" x2="19" y1="12" y2="12"/>'),
        link: _md_svg('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'),
        source: _md_svg('<path d="M9 9L4 12l5 3"/><path d="M15 9l5 3-5 3"/><line x1="12" x2="12" y1="6" y2="18"/>'),
        image: _md_svg('<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>'),
    };

    var MD_MAX_IMAGE_BYTES = 5 * 1024 * 1024;
    var MD_ALLOWED_IMAGE_MIMES = [
        'image/png', 'image/jpeg', 'image/gif', 'image/webp'];
    var MD_RES_RE = /^md-res:([0-9a-f]{32})$/;
    var MD_REFERENCE_SEARCH_LIMIT = 10;
    var MD_REFERENCE_SEARCH_DEBOUNCE = 200;
    // A trigger is one ASCII punctuation character, that a plain label
    // escapes, except the escape and the brackets of the link
    var MD_TRIGGER_CHAR_RE = /^[!-/:-@^-`{-~]$/;
    // The colours of a mention chip, picked by the value of the variant field
    // its trigger names, the first one by default: complete from the start so
    // that a module adds a variant without touching Sao.
    var MD_CHIP_COLOURS = ['blue', 'violet', 'green', 'orange', 'red', 'grey'];

    // Built per call: a Sao.Model holds the session it was created in
    var _md_model = function(model_name) {
        return new Sao.Model(model_name);
    };

    // Whether the records of a model have an avatar (avatar_url), asked once
    // per session; a failed call is asked again next time
    var _md_avatar_models = new WeakMap();
    var _md_has_avatar = function(model_name) {
        var session = Sao.Session.current_session;
        var models = _md_avatar_models.get(session);
        if (!models) {
            models = new Map();
            _md_avatar_models.set(session, models);
        }
        if (!models.has(model_name)) {
            models.set(model_name, _md_model(model_name).execute(
                'fields_get', [['avatar_url']], {}, true, false).then(
                (fields) => Boolean(fields && fields.avatar_url),
                () => {
                    models.delete(model_name);
                    return false;
                }));
        }
        return models.get(model_name);
    };

    // Every Markdown widget of a one2many (one per comment) reads the records
    // its references point at: the reads asked in the same tick are merged
    // into one call per model, and an id already being read reuses that call.
    // A search_read rather than a read, so that a record deleted or out of the
    // user's rules is missing instead of failing the others; a call refused
    // (no access to the model) leaves them all missing. Nothing is kept once
    // the call returns.
    var _md_reference_reads = new Map();
    var _md_read_references = function(model_name, ids, fields, context) {
        var key = [
            model_name, fields.join(','), JSON.stringify(context || {}),
        ].join(' ');
        var reads = _md_reference_reads.get(key);
        if (!reads) {
            reads = {pending: new Map(), batch: null};
            _md_reference_reads.set(key, reads);
        }
        var prms = ids.map((id) => {
            if (!reads.pending.has(id)) {
                if (!reads.batch) {
                    var batch = reads.batch = {ids: [], dfd: jQuery.Deferred()};
                    setTimeout(() => {
                        reads.batch = null;
                        jQuery.when(_md_model(model_name).execute(
                            'search_read',
                            [[['id', 'in', batch.ids]], 0, null, null, fields],
                            jQuery.extend({}, context, {active_test: false}),
                            true, false))
                            .then(batch.dfd.resolve, () => batch.dfd.resolve([]))
                            .always(() => {
                                batch.ids.forEach(
                                    (id) => reads.pending.delete(id));
                            });
                    });
                }
                reads.batch.ids.push(id);
                reads.pending.set(id, reads.batch.dfd.then(
                    (rows) => rows.find((row) => row.id === id) || null));
            }
            return reads.pending.get(id);
        });
        return jQuery.when.apply(jQuery, prms).then(function() {
            var rows = {};
            for (var i = 0; i < ids.length; i++) {
                rows[ids[i]] = arguments[i];
            }
            return rows;
        });
    };

    var _md_initials = function(name) {
        return name.split(/\s+/).filter(Boolean).slice(0, 2)
            .map((word) => Array.from(word)[0]).join('').toUpperCase();
    };

    var _md_bytes_to_data_url = function(bytes, mime) {
        if (!bytes) { return null; }
        if (typeof bytes === 'string') {
            return 'data:' + (mime || 'image/png') + ';base64,' + bytes;
        }
        var binary = '';
        var chunk = 0x8000;
        for (var i = 0; i < bytes.length; i += chunk) {
            binary += String.fromCharCode.apply(null,
                bytes.subarray(i, Math.min(i + chunk, bytes.length)));
        }
        return 'data:' + (mime || 'image/png') + ';base64,' + btoa(binary);
    };

    var _md_sniff_mime = function(bytes) {
        if (!(bytes instanceof Uint8Array)) { return null; }
        if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 &&
            bytes[2] === 0x4e && bytes[3] === 0x47) {
            return 'image/png';
        }
        if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 &&
            bytes[2] === 0xff) {
            return 'image/jpeg';
        }
        if (bytes.length >= 6 && bytes[0] === 0x47 && bytes[1] === 0x49 &&
            bytes[2] === 0x46 && bytes[3] === 0x38) {
            return 'image/gif';
        }
        if (bytes.length >= 12 &&
            bytes[0] === 0x52 && bytes[1] === 0x49 &&
            bytes[2] === 0x46 && bytes[3] === 0x46 &&
            bytes[8] === 0x57 && bytes[9] === 0x45 &&
            bytes[10] === 0x42 && bytes[11] === 0x50) {
            return 'image/webp';
        }
        return null;
    };

    var _md_new_uuid = function() {
        var bytes = new Uint8Array(16);
        window.crypto.getRandomValues(bytes);
        var hex = '';
        for (var i = 0; i < bytes.length; i++) {
            hex += ('0' + bytes[i].toString(16)).slice(-2);
        }
        return hex;
    };

    var MD_IMAGE_NODE = Tiptap.Node.create({
        name: 'image',
        group: 'inline',
        inline: true,
        atom: true,
        selectable: true,
        draggable: true,
        addOptions: function() {
            return {widget: null};
        },
        addAttributes: function() {
            return {
                src: {default: null},
                alt: {default: null},
                title: {default: null},
            };
        },
        parseHTML: function() {
            return [{tag: 'img[src]'}];
        },
        renderHTML: function(props) {
            var attrs = props.HTMLAttributes || {};
            var widget = this.options.widget;
            var src = attrs.src || '';
            var display_src = src;
            var match = MD_RES_RE.exec(src);
            if (match && widget && widget._image_cache) {
                var cached = widget._image_cache.get(match[1]);
                display_src = cached || '';
            }
            var out = jQuery.extend({}, attrs, {src: display_src});
            // Keep data-md-res so _refresh_image_nodes() can patch src in-place
            // once the async data URL resolves, without re-rendering the editor.
            if (match) {
                out['data-md-res'] = match[1];
            }
            return ['img', out];
        },
        markdownTokenName: 'image',
        parseMarkdown: function(token, helpers) {
            return helpers.createNode('image', {
                src: token.href,
                alt: token.text,
                title: token.title || null,
            });
        },
        renderMarkdown: function(node) {
            var attrs = node.attrs || {};
            var alt = attrs.alt || '';
            var src = attrs.src || '';
            var title = attrs.title ? ' "' + attrs.title + '"' : '';
            return '![' + alt + '](' + src + title + ')';
        },
    });

    Sao.View.Form.Markdown = Sao.class_(Sao.View.Form.Widget, {
        class_: 'form-markdown',
        expand: true,
        init: function(view, attributes) {
            Sao.View.Form.Markdown._super.init.call(this, view, attributes);
            this._show_toolbar = parseInt(attributes.toolbar || '1', 10) !== 0;
            // View attributes documented on MarkdownMixin (coog_core)
            this._preview_lines = parseInt(attributes.preview_lines || '0', 10);
            this._expanded = true;
            this._source_mode = false;
            this._baseline = '';
            this._image_cache = new Map();
            this._triggers = this._parse_triggers(
                attributes.reference_triggers);
            // What was read of the records the references point at, per
            // loading of the record: a reloaded record reads them again
            this._references = new WeakMap();
            this._picker_closers = [];
            // The trigger and query of the last search answered, to tell a
            // search running from one that found nothing
            this._search_answered = null;
            this._file_input = jQuery('<input/>', {
                'type': 'file',
                'accept': MD_ALLOWED_IMAGE_MIMES.join(','),
            }).css('display', 'none').on('change', (ev) => {
                var pos = this._pending_insert_pos;
                this._pending_insert_pos = undefined;
                var files = ev.target.files;
                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        this._insert_image_from_file(files[i], pos);
                        pos = null;
                    }
                }
                ev.target.value = '';
            });
            this.el = jQuery('<div/>', {
                'class': this.class_ + ' panel panel-default',
            });
            this.el.append(this._file_input);
            this._title_field = attributes.title_field;
            this._avatar_field = attributes.avatar_field;
            if (parseInt(attributes.show_title || '0', 10) ||
                    this._title_field) {
                this._title = jQuery('<div/>', {
                    'class': 'md-title',
                }).appendTo(this.el);
                if (this._avatar_field) {
                    this._avatar = jQuery('<span/>', {
                        'class': 'md-avatar',
                    }).appendTo(this._title);
                }
                this._title_text = jQuery('<span/>', {
                    'class': 'md-title-text',
                    'text': this._title_field ? '' : (attributes.string || ''),
                }).appendTo(this._title);
            }
            this.prev_record = undefined;
            this._toolbar_heading = jQuery('<div/>', {
                'class': 'panel-heading',
            }).appendTo(this.el);
            this.toolbar = this._build_toolbar().appendTo(
                this._toolbar_heading);
            this._table_toolbar = this._build_table_toolbar().appendTo(
                this._toolbar_heading);
            var body = jQuery('<div/>', {
                'class': 'panel-body',
            }).appendTo(this.el);
            this._mount = jQuery('<div/>', {
                'class': 'markdown-editor mousetrap',
            }).appendTo(body).on('click', 'span.md-reference-link', (ev) => {
                ev.preventDefault();
                var span = ev.currentTarget;
                this._open_reference(
                    span.getAttribute('data-model'),
                    Number(span.getAttribute('data-id')));
            });
            this._source_textarea = jQuery('<textarea/>', {
                'class': 'markdown-source',
            }).appendTo(body).sao_hide()
                .on('input', () => {
                    this.send_modified();
                    this._resize_source_textarea();
                })
                .on('blur', () => {
                    Sao.View.Form.Markdown._super.focus_out.call(this);
                });
            var extensions = [
                Tiptap.StarterKit.configure({codeBlock: false, link: false}),
                Tiptap.Markdown,
                Tiptap.CodeBlockLowlight.configure({lowlight: Tiptap.lowlight}),
                Tiptap.Link.configure({openOnClick: false}),
                Tiptap.MarkdownTable.configure({resizable: false}),
                Tiptap.MarkdownTableRow,
                Tiptap.MarkdownTableCell,
                Tiptap.MarkdownTableHeader,
                Tiptap.MarkdownTaskList,
                Tiptap.MarkdownTaskItem.configure({nested: true}),
                MD_IMAGE_NODE.configure({widget: this}),
            ];
            extensions.push(Tiptap.TrytonReference.configure({
                renderHTML: (props) => this._render_reference(props),
                suggestions: this._triggers.filter((t) => t.char).map(
                    (trigger) => ({
                    char: trigger.char,
                    debounce: MD_REFERENCE_SEARCH_DEBOUNCE,
                    items: (props) => this._search_references(
                        trigger, props.query),
                    render: () => this._reference_picker(trigger),
                })),
                words: this._triggers.filter((t) => !t.char).map(
                    (trigger) => ({
                        pattern: trigger.pattern,
                        resolve: (word) => this._resolve_word(trigger, word),
                    })),
            }));
            this._editor = new Tiptap.Editor({
                element: this._mount[0],
                extensions: extensions,
                content: '',
                marked: {
                    gfm: true,
                    breaks: false,
                    pedantic: false
                },
                onUpdate: () => {
                    this.send_modified();
                    this._update_toolbar_state();
                },
                onSelectionUpdate: () => {
                    this._update_toolbar_state();
                },
                onFocus: () => {
                    if (this._preview_lines > 0) {
                        this._set_expanded(true);
                    }
                },
                onBlur: () => {
                    this._picker_closers.forEach((close) => close());
                    Sao.View.Form.Markdown._super.focus_out.call(this);
                },
                editorProps: {
                    handleDrop: (view, event, slice, moved) => {
                        if (moved) { return false; }
                        var files = event.dataTransfer &&
                            event.dataTransfer.files;
                        if (!files || !files.length) { return false; }
                        var image_files = [];
                        for (var i = 0; i < files.length; i++) {
                            if (files[i].type &&
                                    files[i].type.indexOf('image/') === 0) {
                                image_files.push(files[i]);
                            }
                        }
                        if (!image_files.length) { return false; }
                        event.preventDefault();
                        var coords = view.posAtCoords({
                            left: event.clientX, top: event.clientY});
                        var pos = coords ? coords.pos : null;
                        for (var f = 0; f < image_files.length; f++) {
                            this._insert_image_from_file(image_files[f], pos);
                            pos = null;
                        }
                        return true;
                    },
                    handlePaste: (view, event) => {
                        var items = event.clipboardData &&
                            event.clipboardData.items;
                        if (!items) { return false; }
                        var image_files = [];
                        for (var i = 0; i < items.length; i++) {
                            if (items[i].kind !== 'file') { continue; }
                            var f = items[i].getAsFile();
                            if (f && f.type &&
                                    f.type.indexOf('image/') === 0) {
                                image_files.push(f);
                            }
                        }
                        if (!image_files.length) { return false; }
                        event.preventDefault();
                        for (var k = 0; k < image_files.length; k++) {
                            this._insert_image_from_file(image_files[k]);
                        }
                        return true;
                    },
                    handleKeyDown: (view, event) => {
                        if (event.ctrlKey && event.shiftKey && event.key === 'V') {
                            event.preventDefault();
                            if (navigator.clipboard && navigator.clipboard.readText) {
                                navigator.clipboard.readText().then(text => {
                                    if (text) {
                                        const { state, dispatch } = view;
                                        dispatch(state.tr.insertText(text));
                                    }
                                }).catch(() => {});
                            }
                            return true;
                        }
                        return false;
                    },
                },
            });
            // A click in the editor of the selected list-form item must not
            // unselect it
            this.el.on('click', (ev) => {
                if (this.el.closest('li.list-group-item-selected').length) {
                    ev.stopPropagation();
                }
            });
            if (this._preview_lines > 0) {
                this.el.addClass('md-preview');
                this._preview_toggle = jQuery('<button/>', {
                    'class': 'btn btn-link md-preview-toggle',
                    'type': 'button',
                }).appendTo(this.el).click((ev) => {
                    // Folding never changes the list-form selection
                    ev.stopPropagation();
                    this._set_expanded(!this._expanded);
                });
                this._set_expanded(false);
                new ResizeObserver(() => this._update_preview()).observe(
                    this._editor.view.dom);
            }
        },
        _build_toolbar: function() {
            var toolbar = jQuery('<div class="md-toolbar"/>');
            this._toolbar_btns = {};

            var add_btn = (key, icon, label, command) => {
                var btn = jQuery('<button/>', {
                    'class': 'md-btn',
                    'type': 'button',
                    'title': label,
                }).html(icon).appendTo(toolbar);
                btn.on('mousedown', (ev) => ev.preventDefault());
                btn.click(() => command(this._editor));
                this._toolbar_btns[key] = btn;
            };

            var add_sep = () => jQuery('<span class="md-sep"/>').appendTo(toolbar);

            add_btn('undo', MD_ICONS.undo, Sao.i18n.gettext("Undo"),
                (e) => e.chain().focus().undo().run());
            add_btn('redo', MD_ICONS.redo, Sao.i18n.gettext("Redo"),
                (e) => e.chain().focus().redo().run());
            add_sep();
            add_btn('bold', MD_ICONS.bold, Sao.i18n.gettext("Bold"),
                (e) => e.chain().focus().toggleBold().run());
            add_btn('italic', MD_ICONS.italic, Sao.i18n.gettext("Italic"),
                (e) => e.chain().focus().toggleItalic().run());
            add_btn('strike', MD_ICONS.strike, Sao.i18n.gettext("Strikethrough"),
                (e) => e.chain().focus().toggleStrike().run());
            add_btn('underline', MD_ICONS.underline, Sao.i18n.gettext("Underline"),
                (e) => e.chain().focus().toggleUnderline().run());
            add_btn('code', MD_ICONS.code, Sao.i18n.gettext("Inline code"),
                (e) => e.chain().focus().toggleCode().run());
            add_sep();
            add_btn('h1', MD_ICONS.h1, Sao.i18n.gettext("Heading 1"),
                (e) => e.chain().focus().toggleHeading({level: 1}).run());
            add_btn('h2', MD_ICONS.h2, Sao.i18n.gettext("Heading 2"),
                (e) => e.chain().focus().toggleHeading({level: 2}).run());
            add_btn('h3', MD_ICONS.h3, Sao.i18n.gettext("Heading 3"),
                (e) => e.chain().focus().toggleHeading({level: 3}).run());
            add_sep();
            add_btn('bulletList', MD_ICONS.bulletList, Sao.i18n.gettext("Bullet list"),
                (e) => e.chain().focus().toggleBulletList().run());
            add_btn('orderedList', MD_ICONS.orderedList, Sao.i18n.gettext("Ordered list"),
                (e) => e.chain().focus().toggleOrderedList().run());
            add_btn('taskList', MD_ICONS.taskList, Sao.i18n.gettext("Task list"),
                (e) => e.chain().focus().toggleTaskList().run());
            add_sep();
            add_btn('blockquote', MD_ICONS.blockquote, Sao.i18n.gettext("Blockquote"),
                (e) => e.chain().focus().toggleBlockquote().run());
            add_btn('codeBlock', MD_ICONS.codeBlock, Sao.i18n.gettext("Code block"),
                (e) => e.chain().focus().toggleCodeBlock().run());
            add_sep();
            add_btn('table', MD_ICONS.table, Sao.i18n.gettext("Insert table"),
                (e) => e.chain().focus().insertTable(
                    {rows: 3, cols: 3, withHeaderRow: true}).run());
            add_btn('hr', MD_ICONS.hr, Sao.i18n.gettext("Horizontal rule"),
                (e) => e.chain().focus().setHorizontalRule().run());
            add_btn('image', MD_ICONS.image, Sao.i18n.gettext("Insert image"),
                () => {
                    try {
                        this._pending_insert_pos =
                            this._editor.state.selection.from;
                    } catch (e) {
                        this._pending_insert_pos = undefined;
                    }
                    this._file_input.trigger('click');
                });
            add_btn('link', MD_ICONS.link, Sao.i18n.gettext("Link"),
                (e) => {
                    if (e.isActive('link')) {
                        e.chain().focus().unsetLink().run();
                        return;
                    }
                    var current = e.getAttributes('link').href || '';
                    var url = window.prompt(
                        Sao.i18n.gettext("Link URL"), current);
                    if (url === null) { return; }
                    if (url === '') {
                        e.chain().focus().unsetLink().run();
                    } else {
                        e.chain().focus().setLink({href: url}).run();
                    }
                });
            add_sep();
            add_btn('source', MD_ICONS.source, Sao.i18n.gettext("Toggle source"),
                () => this._toggle_source());

            return toolbar;
        },
        _build_table_toolbar: function() {
            var toolbar = jQuery('<div class="md-table-toolbar"/>');
            this._table_btns = {};

            var add_btn = (key, label, title, command) => {
                var btn = jQuery('<button/>', {
                    'class': 'md-btn md-table-btn',
                    'type': 'button',
                    'title': title,
                }).text(label).appendTo(toolbar);
                btn.on('mousedown', (ev) => ev.preventDefault());
                btn.click(() => command(this._editor));
                this._table_btns[key] = btn;
            };

            var add_sep = () => jQuery('<span class="md-sep"/>').appendTo(toolbar);

            add_btn('addRowBefore', '+row\u2191', Sao.i18n.gettext("Add row above"),
                (e) => e.chain().focus().addRowBefore().run());
            add_btn('addRowAfter', '+row\u2193', Sao.i18n.gettext("Add row below"),
                (e) => e.chain().focus().addRowAfter().run());
            add_btn('deleteRow', '\u2212row', Sao.i18n.gettext("Delete row"),
                (e) => e.chain().focus().deleteRow().run());
            add_sep();
            add_btn('addColumnBefore', '+col\u2190', Sao.i18n.gettext("Add column before"),
                (e) => e.chain().focus().addColumnBefore().run());
            add_btn('addColumnAfter', '+col\u2192', Sao.i18n.gettext("Add column after"),
                (e) => e.chain().focus().addColumnAfter().run());
            add_btn('deleteColumn', '\u2212col', Sao.i18n.gettext("Delete column"),
                (e) => e.chain().focus().deleteColumn().run());
            add_sep();
            add_btn('deleteTable', '\u00d7table', Sao.i18n.gettext("Delete table"),
                (e) => e.chain().focus().deleteTable().run());

            return toolbar;
        },
        _resize_source_textarea: function() {
            var el = this._source_textarea[0];
            var scrollY = window.scrollY;
            el.style.height = 'auto';
            el.style.height = el.scrollHeight + 'px';
            window.scrollTo(window.scrollX, scrollY);
        },
        _toggle_source: function() {
            this._source_mode = !this._source_mode;
            if (this._source_mode) {
                var editorHeight = this._mount[0].offsetHeight;
                this._source_textarea
                    .val(this._editor.getMarkdown())
                    .css('height', editorHeight + 'px');
                this._mount.sao_hide();
                this._source_textarea.sao_show();
                this._source_textarea[0].focus({preventScroll: true});
                this._table_toolbar.removeClass('is-visible');
                this.toolbar.find('.md-btn').not(this._toolbar_btns.source)
                    .prop('disabled', true);
                this._toolbar_btns.source.addClass('is-active');
            } else {
                var md = this._source_textarea.val();
                this._source_textarea.sao_hide().css('height', '');
                this._mount.sao_show();
                this._editor.commands.setContent(
                    md, {contentType: 'markdown', emitUpdate: false});
                if (md == this._baseline) {
                    // Untouched source: absorb a non-idempotent re-serialization
                    this._baseline = this._editor.getMarkdown();
                }
                this.send_modified();
                this._toolbar_btns.source.removeClass('is-active');
                this.toolbar.find('.md-btn').prop('disabled', false);
                this._update_toolbar_state();
                this._editor.commands.focus(null, {scrollIntoView: false});
            }
        },
        _update_toolbar_state: function() {
            if (!this._editor || !this._toolbar_btns) {
                return;
            }
            if (this._source_mode) {
                this._table_toolbar.removeClass('is-visible');
                return;
            }
            var e = this._editor;
            var states = {
                bold: e.isActive('bold'),
                italic: e.isActive('italic'),
                strike: e.isActive('strike'),
                underline: e.isActive('underline'),
                code: e.isActive('code'),
                h1: e.isActive('heading', {level: 1}),
                h2: e.isActive('heading', {level: 2}),
                h3: e.isActive('heading', {level: 3}),
                bulletList: e.isActive('bulletList'),
                orderedList: e.isActive('orderedList'),
                taskList: e.isActive('taskList'),
                blockquote: e.isActive('blockquote'),
                codeBlock: e.isActive('codeBlock'),
                link: e.isActive('link'),
            };
            for (var key in states) {
                if (this._toolbar_btns[key]) {
                    this._toolbar_btns[key].toggleClass('is-active', states[key]);
                }
            }
            if (this._toolbar_btns.undo) {
                this._toolbar_btns.undo.prop('disabled', !e.can().undo());
            }
            if (this._toolbar_btns.redo) {
                this._toolbar_btns.redo.prop('disabled', !e.can().redo());
            }
            this._table_toolbar.toggleClass('is-visible', e.isActive('table'));
        },
        display: function() {
            var prm = Sao.View.Form.Markdown._super.display.call(this);
            var value = '';
            var record = this.record;
            if (record) {
                value = record.field_get_client(this.field_name) || '';
            }
            var record_changed = (this.record !== this.prev_record);
            if (record_changed) {
                this._image_cache.clear();
            }
            if (record_changed && (this._preview_lines > 0)) {
                this._set_expanded(false);
            }
            if (this._title_field) {
                this._display_title(record);
            }
            this._editor.commands.setContent(
                value, {contentType: 'markdown', emitUpdate: false});
            // tiptap re-serializes the stored markdown (ADF imports, API,
            // older tiptap versions): compare user edits against that
            // normalized form, not the raw value, or merely displaying a
            // record would mark it as modified.
            this._baseline = this._editor.getMarkdown();
            // ProseMirror keeps the DOM of the references whose attributes
            // did not change: give them what was read for this record.
            this._refresh_reference_nodes();
            if (this._source_mode) {
                this._source_textarea.val(this._baseline);
            }
            if (record_changed) {
                this.prev_record = this.record;
                // tiptap-pm History has no clearHistory() API; unregister+re-register
                // is the only way to reset undo state when switching records.
                this._editor.unregisterPlugin('history');
                this._editor.registerPlugin(Tiptap.History({}));
            }
            // Load images asynchronously; _cache_resource calls
            // _refresh_image_nodes() per image as data URLs become available.
            this._sync_image_cache();
            this._load_references();
            return prm;
        },
        _parse_triggers: function(value) {
            // Evaluated on the record when searching: only the plain values
            // are read here
            if (!value) { return []; }
            // A trigger is either a character or the pattern of a word
            var triggers = new Sao.PYSON.Decoder({}, true).decode(value);
            return (triggers || []).filter((t) => t.model && (t.char ?
                MD_TRIGGER_CHAR_RE.test(t.char) :
                typeof t.pattern === 'string' && Boolean(t.match_field)));
        },
        _trigger_for: function(model_name) {
            return this._triggers.find((t) => t.model === model_name) || {};
        },
        _reference_cache: function() {
            if (!this.record) { return new Map(); }
            var cache = this._references.get(this.record._values);
            if (!cache) {
                cache = new Map();
                this._references.set(this.record._values, cache);
            }
            return cache;
        },
        _reference_entry: function(trigger, row) {
            var label_field = trigger.label_field || 'rec_name';
            return {
                label: row[label_field] || row.rec_name || String(row.id),
                variant: trigger.variant_field ?
                    row[trigger.variant_field] : null,
                avatar_url: row.avatar_url || null,
            };
        },
        _reference_fields: function(trigger, avatar) {
            var fields = ['rec_name', trigger.label_field || 'rec_name'];
            if (trigger.variant_field) {
                fields.push(trigger.variant_field);
            }
            if (avatar) {
                fields.push('avatar_url');
            }
            return fields.filter((f, i) => fields.indexOf(f) === i);
        },
        _reference_context: function() {
            return this.record ? this.field.get_context(this.record) : {};
        },
        _evaluated_trigger: function(trigger) {
            // The domain and order of trigger, evaluated on the record as it
            // is now
            return (this.record.expr_eval(
                this.attributes.reference_triggers) || []).find((t) =>
                t.char === trigger.char && t.pattern === trigger.pattern) ||
                {};
        },
        _search_references: function(trigger, query) {
            if (!this.record || query.length < (trigger.min_chars || 0)) {
                return Promise.resolve([]);
            }
            var evaluated = this._evaluated_trigger(trigger);
            var domain = [
                evaluated.domain || [],
                ['rec_name', 'ilike', '%' + query + '%'],
            ];
            var context = this._reference_context();
            var prm = jQuery.when(
                trigger.mention ? _md_has_avatar(trigger.model) : false)
                .then((avatar) => _md_model(trigger.model).execute(
                    'search_read',
                    [domain, 0, MD_REFERENCE_SEARCH_LIMIT,
                        evaluated.order || null,
                        this._reference_fields(trigger, avatar)],
                    context, true, false))
                .then((rows) => rows.map((row) => {
                    var entry = this._reference_entry(trigger, row);
                    return {
                        model: trigger.model,
                        id: String(row.id),
                        name: row.rec_name || entry.label,
                        label: entry.label,
                        mention: trigger.mention ? trigger.char : null,
                        entry: entry,
                    };
                }))
                .always(() => {
                    this._search_answered = trigger.char + '\n' + query;
                });
            return Promise.resolve(prm);
        },
        _resolve_word: function(trigger, word) {
            // The reference a word typed in full stands for: the one record
            // whose match field holds it, nothing when there are none or
            // several
            var record = this.record;
            if (!record) { return Promise.resolve(null); }
            var domain = [
                this._evaluated_trigger(trigger).domain || [],
                [trigger.match_field, '=', word],
            ];
            var cache = this._reference_cache();
            return Promise.resolve(_md_model(trigger.model).execute(
                'search_read',
                [domain, 0, 2, null, this._reference_fields(trigger, false)],
                this._reference_context(), true, false).then((rows) => {
                // Another record may be displayed by now
                if (rows.length !== 1 || this.record !== record) {
                    return null;
                }
                var entry = this._reference_entry(trigger, rows[0]);
                // Shown as read at once, without waiting for a reload
                cache.set(trigger.model + ':' + rows[0].id, entry);
                return {
                    model: trigger.model,
                    id: rows[0].id,
                    label: entry.label,
                };
            }, () => null));
        },
        _load_references: function() {
            // Reads what is not known yet of the records the references point
            // at, the label refreshed from the label field of the trigger of
            // their model, rec_name by default
            if (!this.record || !this._editor) { return; }
            var cache = this._reference_cache();
            var wanted = new Map();
            this._editor.state.doc.descendants((node) => {
                if (node.type.name !== 'trytonReference') { return; }
                var key = node.attrs.model + ':' + node.attrs.id;
                if (cache.has(key)) { return; }
                var want = wanted.get(node.attrs.model);
                if (!want) {
                    want = {ids: new Set(), mention: false};
                    wanted.set(node.attrs.model, want);
                }
                want.ids.add(Number(node.attrs.id));
                want.mention = want.mention || Boolean(node.attrs.mention);
            });
            var context = this._reference_context();
            wanted.forEach((want, model_name) => {
                var trigger = this._trigger_for(model_name);
                var ids = Array.from(want.ids);
                jQuery.when(want.mention ? _md_has_avatar(model_name) : false)
                    .then((avatar) => _md_read_references(
                        model_name, ids,
                        this._reference_fields(trigger, avatar), context))
                    .then((rows) => {
                        ids.forEach((id) => {
                            var row = rows[id];
                            cache.set(model_name + ':' + id, row ?
                                this._reference_entry(trigger, row) : null);
                        });
                        if (cache === this._reference_cache()) {
                            this._refresh_reference_nodes();
                        }
                    });
            });
        },
        _fill_reference: function(el, attrs) {
            // A reference not read yet (undefined) or unreadable (null) shows
            // its stored label and opens nothing
            var entry = this._reference_cache().get(
                attrs.model + ':' + attrs.id);
            var label = (entry && entry.label) || attrs.label || attrs.id || '';
            var span = jQuery(el).empty().attr('class', 'md-reference')
                .toggleClass('md-reference-link', Boolean(entry));
            if (!attrs.mention) {
                span.text(label);
                return;
            }
            var colour = entry && MD_CHIP_COLOURS.indexOf(entry.variant) >= 0 ?
                entry.variant : MD_CHIP_COLOURS[0];
            span.addClass('md-mention md-chip-' + colour);
            if (entry && entry.avatar_url) {
                jQuery('<img/>', {
                    'class': 'md-mention-avatar',
                    'src': entry.avatar_url + '?s=32',
                    'alt': '',
                }).appendTo(span);
            } else {
                jQuery('<span/>', {'class': 'md-mention-avatar'})
                    .text(_md_initials(label)).appendTo(span);
            }
            span.append(document.createTextNode(attrs.mention + label));
        },
        _render_reference: function(props) {
            var el = document.createElement('span');
            for (var name in props.HTMLAttributes) {
                el.setAttribute(name, props.HTMLAttributes[name]);
            }
            this._fill_reference(el, props.node.attrs);
            return el;
        },
        _refresh_reference_nodes: function() {
            if (!this._editor || !this._editor.view) { return; }
            var dom = this._editor.view.dom;
            jQuery(dom).find('span[data-type="trytonReference"]').each(
                (_, span) => {
                    this._fill_reference(span, {
                        model: span.getAttribute('data-model'),
                        id: span.getAttribute('data-id'),
                        label: span.getAttribute('data-label'),
                        mention: span.getAttribute('data-mention'),
                    });
                });
        },
        _open_reference: function(model_name, id) {
            Sao.Tab.create({
                'model': model_name,
                'res_id': id,
                'mode': ['form'],
                'domain': [['id', '=', id]],
                'context': this._reference_context(),
                'name': Sao.common.MODELNAME.get(model_name),
            });
        },
        _reference_picker: function(trigger) {
            var popup = null;
            var props = null;
            var active = 0;
            var close = () => {
                if (popup) {
                    popup.remove();
                    popup = null;
                }
            };
            this._picker_closers.push(close);
            var choose = (index) => {
                var item = props && props.items[index];
                if (item) {
                    // Shown as read at once, without waiting for a reload
                    this._reference_cache().set(
                        item.model + ':' + item.id, item.entry);
                    props.command({
                        model: item.model,
                        id: item.id,
                        label: item.label,
                        mention: item.mention,
                    });
                }
            };
            var draw = () => {
                if (!popup) {
                    popup = jQuery('<div class="md-reference-popup"/>')
                        .appendTo('body');
                }
                popup.empty();
                var items = props.items || [];
                if (!items.length) {
                    var min_chars = trigger.min_chars || 0;
                    var status;
                    if (props.query.length < min_chars) {
                        status = Sao.i18n.gettext(
                            "Type at least %1 characters", min_chars);
                    } else if (this._search_answered !==
                            trigger.char + '\n' + props.query) {
                        status = Sao.i18n.gettext("Loading...");
                    } else {
                        status = Sao.i18n.gettext("No match");
                    }
                    jQuery('<div class="md-reference-status"/>')
                        .text(status).appendTo(popup);
                }
                var names = items.map((item) => item.name);
                items.forEach((item, index) => {
                    var option = jQuery('<div class="md-reference-option"/>')
                        .toggleClass('is-active', index === active)
                        .text(item.name)
                        .on('mousedown', (ev) => {
                            ev.preventDefault();
                            choose(index);
                        })
                        .appendTo(popup);
                    if (names.indexOf(item.name) !==
                            names.lastIndexOf(item.name)) {
                        jQuery('<small/>').text(' #' + item.id)
                            .appendTo(option);
                    }
                });
                var rect = props.clientRect && props.clientRect();
                if (rect) {
                    popup.css({
                        left: rect.left + 'px',
                        top: (rect.bottom + 4) + 'px',
                    });
                }
            };
            return {
                onStart: (start_props) => {
                    props = start_props;
                    active = 0;
                    this._search_answered = null;
                    draw();
                },
                onUpdate: (update_props) => {
                    if (update_props.query !== props.query) {
                        active = 0;
                        this._search_answered = null;
                    }
                    props = update_props;
                    draw();
                },
                onKeyDown: (key_props) => {
                    var event = key_props.event;
                    if (event.key === 'Escape') {
                        close();
                        return true;
                    }
                    if (!props || !props.items.length) { return false; }
                    var count = props.items.length;
                    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                        active = (active +
                            (event.key === 'ArrowDown' ? 1 : -1) + count) % count;
                        draw();
                        return true;
                    }
                    if (event.key === 'Enter') {
                        choose(active);
                        return true;
                    }
                    return false;
                },
                onExit: close,
            };
        },
        _get_markdown_resources_group: function() {
            if (!this.record) { return null; }
            try {
                return this.record.field_get_client('markdown_resources');
            } catch (e) {
                return null;
            }
        },
        _live_resources: function(group) {
            // Pending removals stay in the group array until the parent record
            // is saved; filter them out so we don't try to load their data.
            var removed = group.record_removed || [];
            var deleted = group.record_deleted || [];
            var all = [];
            for (var i = 0; i < group.length; i++) {
                var r = group[i];
                if (removed.indexOf(r) >= 0 || deleted.indexOf(r) >= 0) {
                    continue;
                }
                all.push(r);
            }
            return all;
        },
        _sync_image_cache: function() {
            var group = this._get_markdown_resources_group();
            if (!group) { return jQuery.when(); }
            return jQuery.when(this._ensure_resource_fields(group)).then(
                () => {
                    var all = this._live_resources(group);
                    if (!all.length) { return; }
                    return this._load_resources_meta(group, all).then(() => {
                        var matches = all.filter((r) => {
                            try {
                                return r.field_get_client('field') ===
                                    this.field_name;
                            } catch (e) { return false; }
                        });
                        var promises = matches.map(
                            (r) => this._cache_resource(r));
                        return jQuery.when.apply(jQuery, promises);
                    });
                });
        },
        _load_resources_meta: function(group, resources) {
            // New (unsaved) records already have uuid/field set client-side.
            // For saved records, field_get_client() would trigger a lazy fetch
            // that may not resolve before we filter by field name, so we
            // batch-read and inject directly into _values/_loaded.
            var to_load = resources.filter(
                (r) => r.id >= 0 && !r.is_loaded('uuid'));
            if (!to_load.length) { return jQuery.when(); }
            var ids = to_load.map((r) => r.id);
            return jQuery.when(group.model.execute(
                'read', [ids, ['uuid', 'field']])).then((rows) => {
                    var by_id = {};
                    rows.forEach((row) => { by_id[row.id] = row; });
                    to_load.forEach((r) => {
                        var row = by_id[r.id];
                        if (!row) { return; }
                        r._values.uuid = row.uuid;
                        r._values.field = row.field;
                        r._loaded.uuid = true;
                        r._loaded.field = true;
                    });
                });
        },
        _cache_resource: function(resource) {
            var uuid;
            try {
                uuid = resource.field_get_client('uuid');
            } catch (e) { return jQuery.when(); }
            if (!uuid || this._image_cache.has(uuid)) {
                return jQuery.when();
            }
            var image_field = resource.model.fields.image;
            if (!image_field) { return jQuery.when(); }
            var data_prm = image_field.get_data(resource);
            return jQuery.when(data_prm).then((data) => {
                if (!data) { return; }
                var mime;
                if (data instanceof Uint8Array) {
                    mime = _md_sniff_mime(data);
                }
                this._image_cache.set(uuid,
                    _md_bytes_to_data_url(data, mime));
                this._refresh_image_nodes();
            });
        },
        _refresh_image_nodes: function() {
            if (!this._editor || !this._editor.view) { return; }
            var dom = this._editor.view.dom;
            jQuery(dom).find('img[data-md-res]').each((_, img) => {
                var uuid = img.getAttribute('data-md-res');
                var cached = this._image_cache.get(uuid);
                if (cached) {
                    img.src = cached;
                }
            });
        },
        _ensure_resource_fields: function(group) {
            var needed = ['field', 'uuid', 'image'];
            var missing = needed.filter(
                (n) => !group.model.fields[n]);
            if (!missing.length) { return jQuery.when(); }
            return jQuery.when(group.model.execute(
                'fields_get', [missing])).then((descs) => {
                    group.add_fields(descs);
                });
        },
        _insert_image_from_file: function(file, pos) {
            if (!this.record) { return; }
            if (MD_ALLOWED_IMAGE_MIMES.indexOf(file.type) === -1) {
                this._show_image_error(
                    Sao.i18n.gettext("Unsupported image type"));
                return;
            }
            if (file.size > MD_MAX_IMAGE_BYTES) {
                var mb = Math.floor(MD_MAX_IMAGE_BYTES / 1024 / 1024);
                this._show_image_error(
                    Sao.i18n.gettext("Image too large (max ") +
                    mb + ' MB)');
                return;
            }
            var reader = new FileReader();
            reader.onload = (ev) => {
                var bytes = new Uint8Array(ev.target.result);
                var uuid = _md_new_uuid();
                var group;
                try {
                    group = this.record.field_get_client(
                        'markdown_resources');
                } catch (e) {
                    this._show_image_error(Sao.i18n.gettext(
                        "Cannot insert image: record does not support" +
                        " markdown resources"));
                    return;
                }
                if (!group) {
                    this._show_image_error(Sao.i18n.gettext(
                        "Cannot insert image: markdown_resources field" +
                        " is not loaded in this view"));
                    return;
                }
                jQuery.when(this._ensure_resource_fields(group)).then(() => {
                    // Cache the data URL immediately so renderHTML can resolve
                    // the md-res: src before the record is saved.
                    this._image_cache.set(uuid,
                        _md_bytes_to_data_url(bytes, file.type));
                    var node = {
                        type: 'image',
                        attrs: {
                            src: 'md-res:' + uuid,
                            alt: file.name || '',
                        },
                    };
                    var chain = this._editor.chain().focus();
                    if (pos !== undefined && pos !== null) {
                        chain.insertContentAt(pos, node);
                    } else {
                        chain.insertContent(node);
                    }
                    chain.run();
                    // Commit the markdown text (with the md-res: token) to the
                    // field before creating the resource record so both stay in
                    // sync if the parent record is saved immediately.
                    this.set_value();
                    var new_record = group.new_(false);
                    new_record.model.fields.field.set_client(
                        new_record, this.field_name);
                    new_record.model.fields.uuid.set_client(
                        new_record, uuid);
                    new_record.model.fields.image.set_client(
                        new_record, bytes);
                    group.add(new_record, -1, true);
                });
            };
            reader.onerror = () => {
                this._show_image_error(
                    Sao.i18n.gettext("Could not read image file"));
            };
            reader.readAsArrayBuffer(file);
        },
        _show_image_error: function(message) {
            if (this._error_tip) {
                this._error_tip.remove();
            }
            var tip = jQuery('<div class="md-image-error"/>').text(message);
            this._error_tip = tip;
            var anchor = null;
            try {
                var view = this._editor.view;
                var sel = view.state.selection;
                var coords = view.coordsAtPos(sel.from);
                anchor = {left: coords.left, top: coords.bottom};
            } catch (e) { /* fall through */ }
            if (!anchor) {
                var rect = this._mount[0].getBoundingClientRect();
                anchor = {left: rect.left + 8, top: rect.top + 8};
            }
            tip.css({
                position: 'fixed',
                left: anchor.left + 'px',
                top: (anchor.top + 4) + 'px',
            }).appendTo('body');
            tip.on('click', () => tip.remove());
            setTimeout(() => {
                if (tip === this._error_tip) { this._error_tip = null; }
                tip.remove();
            }, 4000);
        },
        focus: function() {
            if (this._source_mode) {
                this._source_textarea[0].focus();
            } else {
                this._editor.commands.focus();
            }
        },
        get_value: function() {
            if (this._source_mode) {
                return this._source_textarea.val();
            }
            return this._editor.getMarkdown();
        },
        set_value: function() {
            if (!this.modified) {
                return;
            }
            var value = this.get_value();
            this.field.set_client(this.record, value);
            this._baseline = value;
        },
        get modified() {
            if (this.record && this.field) {
                return this._baseline != this.get_value();
            }
            return false;
        },
        set_readonly: function(readonly) {
            Sao.View.Form.Markdown._super.set_readonly.call(this, readonly);
            var record = this.record;
            var disabled = readonly || !record;
            this._editor.setEditable(!disabled);
            this._source_textarea.prop('readonly', disabled);
            this.toolbar.find('button').prop('disabled', disabled);
            this._table_toolbar.find('button').prop('disabled', disabled);
            this._disabled = disabled;
            this._update_toolbar_visibility();
        },
        _update_toolbar_visibility: function() {
            if (this._disabled || !this._show_toolbar) {
                this._toolbar_heading.sao_hide();
            } else {
                this._toolbar_heading.sao_show();
                if (this._source_mode) {
                    this.toolbar.find('.md-btn').not(this._toolbar_btns.source)
                        .prop('disabled', true);
                }
            }
        },
        _display_title: function(record) {
            var get = (name) => record ?
                (record.field_get_client(name) || '') : '';
            var title = get(this._title_field);
            // No title on a record being typed: nothing posted yet
            this._title.toggle(Boolean(title));
            this._title_text.text(title);
            if (this._avatar) {
                var initials = get(this._avatar_field);
                // The same initials always get the same color
                var hash = 0;
                for (const c of initials) {
                    hash = (hash * 31 + c.charCodeAt(0)) | 0;
                }
                this._avatar.text(initials)
                    .css('background-color',
                        `hsl(${Math.abs(hash) % 360}, 45%, 50%)`)
                    .toggle(Boolean(initials));
            }
        },
        _set_expanded: function(expanded) {
            this._expanded = expanded;
            this.el.toggleClass('md-collapsed', !expanded);
            this._update_preview_toggle();
        },
        _update_preview_toggle: function() {
            var lines = this._hidden_lines || 0;
            this._preview_toggle.text(this._expanded ?
                Sao.i18n.gettext("Show less") :
                Sao.i18n.ngettext(
                    "Show more (%1 line)", "Show more (%1 lines)",
                    lines, lines));
        },
        _update_preview: function() {
            // Short content is never folded: no fade and no button
            var dom = this._editor.view.dom;
            var style = window.getComputedStyle(dom);
            var line_height = parseFloat(style.lineHeight) || 24;
            var height = (parseFloat(style.paddingTop) || 0) +
                line_height * this._preview_lines;
            this.el[0].style.setProperty('--md-preview-height', height + 'px');
            this.el.toggleClass('md-overflow', dom.offsetHeight > height + 1);
            // In lines of text: margins, headings and images make it an
            // estimate
            this._hidden_lines = Math.max(1, Math.ceil(
                (dom.offsetHeight - height) / line_height));
            this._update_preview_toggle();
        },
    });
    Sao.View.FormXMLViewParser.WIDGETS['markdown'] =
        Sao.View.Form.Markdown;



    Sao.Tab.contextmenu = function(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        let close_tabs = (mode) => {
            return () => {
                let tabs_to_close = [];
                let target_tab = jQuery(evt.currentTarget).closest('li').data('tab');
                let met_target = false;
                for (let tab of Sao.Tab.tabs) {
                    if (tab == target_tab) {
                        met_target = true;
                        continue;
                    }
                    if (met_target && (mode == 'left')) {
                        break;
                    }
                    if ((['left', 'others'].includes(mode)) || met_target) {
                        tabs_to_close.push(tab);
                    }
                }

                let prm = null;
                for (let tab of tabs_to_close) {
                    if (prm) {
                        prm = prm.then(() => tab._close_allowed());
                    } else {
                        prm = tab._close_allowed();
                    }
                }
                if (prm) {
                    prm.then(() => {
                        for (let tab of tabs_to_close) {
                            tab.close();
                        }
                    });
                }
            }
        }

        let actions = {
            close_others: close_tabs('others'),
            close_left: close_tabs('left'),
            close_right: close_tabs('right'),
            duplicate: () => {
                let current = Sao.Tab.tabs.get_current();
                Sao.Tab.create(current.attributes, true).then((t) => t.show());
            },
            in_new_tab: () => {
                window.open(window.location.href, '_blank').focus();
            },
        };

        let tab = Sao.Tab.tabs.get_current();
        let menu = Sao.common.PopupMenu.initialize(evt);
        for (const [action, name] of [
            ['close_others', Sao.i18n.gettext("Close all other tabs")],
            ['close_left', Sao.i18n.gettext("Close tabs to the left")],
            ['close_right', Sao.i18n.gettext("Close tabs to the right")],
            ['duplicate', Sao.i18n.gettext("Duplicate the tab")],
            ['in_new_tab', Sao.i18n.gettext("Open in a new browser tab")],
        ]) {
            let menuitem = jQuery('<li/>', {
                'role': 'presentation',
            }).append(jQuery('<a/>', {
                'role': 'menuitem',
                'href': '#',
                'tabindex': -1
            }).text(name).click(actions[action])
            ).appendTo(menu);

            if (((action == 'duplicate') || (action == 'in_new_tab')) &&
                (tab instanceof Sao.Tab.Wizard)) {
                menuitem.addClass("disabled");
                menuitem.children('a').css('pointer-events', 'none');
            }
        }
    };

    Sao.Tab.closed_tabs = [];
    Sao.Tab.undo_close = function() {
        if (Sao.Tab.closed_tabs.length == 0) {
            return;
        }
        let attributes = Sao.Tab.closed_tabs.pop();
        Sao.Tab.create(attributes, true);
    };

    ///////////////////////////////////////////////////////////////////////////
    // CSS status bar based on user preferences
    ///////////////////////////////////////////////////////////////////////////
    // little hack
    Sao.UserMenu.prototype = Sao.UserMenu.__proto__;
    patchedUserMenu = Sao.class_(
        Sao.UserMenu, {
            constructor: function() {
                patchedUserMenu._super.constructor();
                this.custom_status_bar_text = null;
                this.custom_status_bar_color = null;
                this.status_bar_default_text = null;
                this.status_bar_default_color = null;
            },
            update_information: function(data) {
                patchedUserMenu._super.update_information(data);
                if (data.status_bar_text) {
                    this.custom_status_bar_text = data.status_bar_text;
                } else {
                    this.custom_status_bar_text = null;
                }
                if (data.status_bar_color) {
                    this.custom_status_bar_color = data.status_bar_color;
                } else {
                    this.custom_status_bar_color = null;
                }
            },
            update: function() {
                patchedUserMenu._super.update();
                let sandbox = document.getElementById('sandbox');
                if (this.status_bar_default_text === undefined) {
                    if (sandbox.style.display === 'none') {
                        this.status_bar_default_text = '';
                    } else {
                        this.status_bar_default_text = sandbox.children[0].textContent;
                        this.status_bar_default_color = sandbox.style.backgroundColor;
                    }
                }
                var status_bar_text = null;
                if (this.custom_status_bar_text) {
                    status_bar_text = this.custom_status_bar_text;
                } else {
                    status_bar_text = this.status_bar_default_text;
                }
                sandbox.children[0].textContent = status_bar_text;
                if (status_bar_text) {
                    sandbox.style.display = 'flex';
                    if (this.custom_status_bar_color) {
                        sandbox.style.backgroundColor = this.custom_status_bar_color;
                    } else {
                        sandbox.style.backgroundColor = this.status_bar_default_color;
                    }
                } else {
                    sandbox.style.display = 'none';
                }
            },
        });
    Sao.UserMenu = new patchedUserMenu();

    // Apply customcss attributes
    for (var [key, originalWidget] of Object.entries(Sao.View.FormXMLViewParser.WIDGETS)) {
        let patchedWidget = Sao.class_(originalWidget, {
            init: function(view, attributes) {
                let res = patchedWidget._super.init.call(this, view, attributes);
                if (this.el && this.attributes.customcss) {
                    this.attributes.customcss.split(' ').forEach(
                        custom_class => {
                            if (custom_class !== "") {
                                this.el.addClass(custom_class);
                            }
                        }
                    );
                }
                return res;
            },
        });
        Sao.View.FormXMLViewParser.WIDGETS[key] = patchedWidget;
    };
}());
