<template>
    <div class="form-group">
        <label class="col-sm-2 control-label" :for="id">{{label}}</label>
        <span class="col-sm-10 selection">
            <select class="select2" :id="id" :name="name">
                <slot></slot>
                <option v-for="n in list" :value="n.id">{{n.text}}</option>
            </select>
        </span>
    </div>
</template>

<script>
    import 'select2'
    import 'select2/dist/css/select2.min.css'
    import 'select2/dist/js/i18n/zh-CN.js'

    export default {
        props: {
            'name': {
                type: String,
                default: 'select2'
            },
            'list': {
                type: Array,
                default: () => {
                    return [];
                }
            },
            'label': {
                type: String,
                default: ''
            },
            'conf': {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        data() {
            return {
                id: mkid(),
                value: 0,
            }
        },
        mounted() {
            const dconf = {
                language: 'zh-CN', //语言
                placeholder: this.label, //占位符
                allowClear: false, //允许清空，值为null
                closeOnSelect: true, //选择后是否关闭
                minimumInputLength: 0, //最少输入字符
                maximumInputLength: 0, //最多输入字符
                maximumSelectionLength: 0, //最小数量的结果
                sorter: function (data) { //排序字段
                    return data;
                },
                templateResult: function (result) { //选择框模板
                    return result.text;
                },
                templateSelection: function (selection) { //下拉开模板
                    return selection.text;
                },
                theme: 'default', //主题
                width: '100%',
                escapeMarkup: function (markup) {
                    let replaceMap = {
                        '\\': '&#92;',
                        '&': '&amp;',
                        '<': '&lt;',
                        '>': '&gt;',
                        '"': '&quot;',
                        '\'': '&#39;',
                        '/': '&#47;'
                    };
                    if (typeof markup !== 'string') {
                        return markup;
                    }
                    return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
                        return replaceMap[match];
                    });
                },
            };
            if (this.conf.ajax) {
                this.conf.ajax = _.defaultsDeep(this.conf.ajax, {
                    url: "#",
                    dataType: 'json',
                    delay: 250,
                    data: function (params) {
                        return {
                            q: params.term,
                            page: params.page
                        };
                    },
                    processResults: function (data, params) {
                        params.page = params.page || 1;
                        return {
                            results: data.items,
                            pagination: {
                                more: (params.page * 50) < data.total_count
                            }
                        };
                    },
                    cache: true
                });
            }
            let self = $("#" + this.id).select2(_.defaultsDeep(this.conf, dconf));
            $("[for='" + this.id + "']").on("click", function () {
                self.select2("open");
            });
            //value get
            let def = this.conf.allowClear ? null : $('#' + this.id + ' > option:first-child').val();
            if (typeof store.state.form === 'undefined') {
                self.val(def);
            }
            switch (typeof store.state.form[this.name]) {
                case 'undefined':
                case 'object':
                case 'function':
                    self.val(def);
                    break;
                default:
                    self.val(String(store.state.form[this.name]));
            }
            //value set
            self.change(function () {
                let val = $(this).val();
                if (val === null) {
                    store.commit('form_destroy', this.name);
                } else {
                    store.commit('form_change', {name: this.name, value: val});
                }
            });
        }
    }
</script>

<style>
    /*
     * Plugin: Select2
     * ---------------
     */
    .select2-container--default.select2-container--focus,
    .select2-selection.select2-container--focus,
    .select2-container--default:focus,
    .select2-selection:focus,
    .select2-container--default:active,
    .select2-selection:active {
        outline: none !important;
    }

    .select2-container--default .select2-selection--single,
    .select2-selection .select2-selection--single {
        border: 1px solid #d2d6de !important;
        border-radius: 0 !important;
        padding: 6px 12px !important;
        height: 34px !important;
    }

    .select2-container--default.select2-container--open {
        border-color: #3c8dbc !important;
    }

    .select2-dropdown {
        border: 1px solid #d2d6de !important;
        border-radius: 0 !important;
    }

    .select2-container--default .select2-results__option--highlighted[aria-selected] {
        background-color: #3c8dbc !important;
        color: white !important;
    }

    .select2-results__option {
        padding: 6px 12px !important;
        user-select: none !important;
        -webkit-user-select: none !important;
    }

    .select2-container .select2-selection--single .select2-selection__rendered {
        padding-left: 0 !important;
        padding-right: 0 !important;
        height: auto !important;
        margin-top: -4px !important;
    }

    .select2-container[dir="rtl"] .select2-selection--single .select2-selection__rendered {
        padding-right: 6px !important;
        padding-left: 20px !important;
    }

    .select2-container--default .select2-selection--single .select2-selection__arrow {
        height: 28px !important;
        right: 3px !important;
    }

    .select2-container--default .select2-selection--single .select2-selection__arrow b {
        margin-top: 0 !important;
    }

    .select2-dropdown .select2-search__field,
    .select2-search--inline .select2-search__field {
        border: 1px solid #d2d6de !important;
    }

    .select2-dropdown .select2-search__field:focus,
    .select2-search--inline .select2-search__field:focus {
        outline: none !important;
        border: 1px solid #3c8dbc !important;
    }

    .select2-container--default .select2-results__option[aria-disabled=true] {
        color: #999 !important;
    }

    .select2-container--default .select2-results__option[aria-selected=true] {
        background-color: #ddd !important;
    }

    .select2-container--default .select2-results__option[aria-selected=true],
    .select2-container--default .select2-results__option[aria-selected=true]:hover {
        color: #444 !important;
    }

    .select2-container--default .select2-selection--multiple {
        border: 1px solid #d2d6de !important;
        border-radius: 0 !important;
    }

    .select2-container--default .select2-selection--multiple:focus {
        border-color: #3c8dbc !important;
    }

    .select2-container--default.select2-container--focus .select2-selection--multiple {
        border-color: #d2d6de !important;
    }

    .select2-container--default .select2-selection--multiple .select2-selection__choice {
        background-color: #3c8dbc !important;
        border-color: #367fa9 !important;
        padding: 1px 10px !important;
        color: #fff !important;
    }

    .select2-container--default .select2-selection--multiple .select2-selection__choice__remove {
        margin-right: 5px !important;
        color: rgba(255, 255, 255, 0.7) !important;
    }

    .select2-container--default .select2-selection--multiple .select2-selection__choice__remove:hover {
        color: #fff !important;
    }

    .select2-container .select2-selection--single .select2-selection__rendered {
        padding-right: 10px !important;
    }
</style>