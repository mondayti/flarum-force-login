<?php

use Flarum\Extend;
use Flarum\Frontend\Document;

define('DS', DIRECTORY_SEPARATOR);

return [
    (new Extend\Frontend('forum'))
        ->content(function (Document $document) {
            $document->head[] = '<script defer>' . file_get_contents(__DIR__ . DS . 'src' . DS . 'discussion.js') . '</script>';
        })
];
