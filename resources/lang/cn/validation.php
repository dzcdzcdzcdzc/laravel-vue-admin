<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted'             => ':attribute 必须同意。',
    'active_url'           => ':attribute 不是一个合法的网址。',
    'after'                => ':attribute 必须是在 :date 之后（不包括）的日期。',
    'after_or_equal'       => ':attribute 必须是在 :date 之后（包括）的日期。',
    'alpha'                => ':attribute 必须是个字母。',
    'alpha_dash'           => ':attribute 只能是字母、数字、下划线和横线。',
    'alpha_num'            => ':attribute 只能是字母、数字。',
    'array'                => ':attribute 必须是个数组。',
    'before'               => ':attribute 必须是在 :date 之前（不包括）的日期。',
    'before_or_equal'      => ':attribute 必须是在 :date 之前（包括）的日期。',
    'between'              => [
        'numeric' => ':attribute 必须在 :min 到 :max 之间。',
        'file'    => ':attribute 文件大小必须在 :min 千字节和 :max 千字节之间。',
        'string'  => ':attribute 必须有 :min 到 :max 个字组成。',
        'array'   => ':attribute 必须有 :min 到 :max 个值。',
    ],
    'boolean'              => ':attribute 必须为是或否。',
    'confirmed'            => ':attribute 与再次输入的不符。',
    'date'                 => ':attribute 不是一个合法的日期。',
    'date_format'          => ':attribute 不是一个 :format 格式的日期。',
    'different'            => ':attribute 和 :other 必须不同。',
    'digits'               => ':attribute 必须是大小为 :digits 的数字。',
    'digits_between'       => ':attribute 大小必须是在 :min 到 :max 范围内的数字。',
    'dimensions'           => ':attribute 是个错误的图片。',
    'distinct'             => ':attribute 有一个重复的值。',
    'email'                => ':attribute 必须是一个合法的电子邮箱地址。',
    'exists'               => ':attribute 是超出范围的。',
    'file'                 => ':attribute 必须是一个上次成功的文件。',
    'filled'               => ':attribute 必须有一个值。',
    'image'                => ':attribute 必须是一张图片。',
    'in'                   => ':attribute 不在合法的范围。',
    'in_array'             => ':attribute 不在 :other 范围里。',
    'integer'              => ':attribute 必须是个整形。',
    'ip'                   => ':attribute 必须是个合法的ip地址。',
    'json'                 => ':attribute 必须是个合法的JSON字符串。',
    'max'                  => [
        'numeric' => ':attribute 不能超过 :max 。',
        'file'    => ':attribute 文件大小不能超过 :max 千字节。',
        'string'  => ':attribute 不能超过 :max 个字。',
        'array'   => ':attribute 的值个数不能超过 :max 。',
    ],
    'mimes'                => ':attribute 文件类型必须是： :values。',
    'mimetypes'            => ':attribute 文件类型必须是： :values。',
    'min'                  => [
        'numeric' => ':attribute 不能少于 :min。',
        'file'    => ':attribute 文件大小不能少于 :min 千字节。',
        'string'  => ':attribute 不能少于 :min 个字。',
        'array'   => ':attribute 的值个数不能少于 :min 。',
    ],
    'not_in'               => ':attribute 在不合法的范围。',
    'numeric'              => ':attribute 必须是个数字。',
    'present'              => ':attribute 必须出现。',
    'regex'                => ':attribute 格式不合法。',
    'required'             => ':attribute 不能为空。',
    'required_if'          => ':attribute 当 :other 值是 :value 不能为空。',
    'required_unless'      => ':attribute 除非 :other 值是 :values 否则不能为空。',
    'required_with'        => ':attribute 只要任意 :values 存在不能为空。',
    'required_with_all'    => ':attribute 只要所有 :values 存在不能为空。',
    'required_without'     => ':attribute 要任意 :values 存在才能为空。',
    'required_without_all' => ':attribute 要所有 :values 存在才能为空。',
    'same'                 => 'The :attribute and :other must match.',
    'size'                 => [
        'numeric' => ':attribute 必须是 :size 。',
        'file'    => ':attribute 文件大小必须是 :size 千字节。',
        'string'  => ':attribute 文字长度必须是 :size 。',
        'array'   => ':attribute 的值个数必须是 :size 。',
    ],
    'string'               => ':attribute 必须是个字符串。',
    'timezone'             => ':attribute 必须是个合法的时区。',
    'unique'               => ':attribute 不能重复。',
    'uploaded'             => ':attribute 上传失败。',
    'url'                  => ':attribute 不是合法的网址。',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [],

];
