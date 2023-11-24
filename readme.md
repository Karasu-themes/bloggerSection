# @karasu-themes/bloggerSection

Plugin para crear secciones múltiples en Blogger basadas en etiquetas.

## Instalacion

Ve a tu panel de Blogger y en la pestaña `Tema » Editar HTML`, buscamos la etiqueta `</head>` y justo arriba de esta, pegamos el siguiente código:

```xml
<!-- CDN bloggerUtils -->
<script defer='defer' src='//cdn.jsdelivr.net/npm/blogger-utils/dist/bundle.js'></script>
```

Ahora, sin salir del Editor HTML, buscamos la etiqueta `</body>` y justo encima de esta, pegamos el código JavaScript para poder instanciar las secciones:

```html
<script>
document.addEventListener("DOMContentLoaded", () => {
  if (typeof window["BloggerSection"] !== "undefined") {
    const bs = BloggerSection;
    bs.init();
  }
});
</script>
```

Guardamos los cambios y listo. Sigue leyendo para saber cómo usar las secciones.

### Usando las secciones

Para crear/usar una sección, basta con ir a la pestaña 'Diseño' de nuestro Panel y en la sección de Blogger donde queremos usar el plugin, creamos un nuevo gadget de tipo HTML con el siguiente código HTML:

```html
<div class='bs-wrapper' data-label='TAG_NAME' data-results='RESULTS'>
    <div class='bs-container'></div>
	<!-- [[ START TEMPLATE -->
    <template class='bs-render' hidden>
        <div class="card">
            <h2>{title}</h2>
            <p>{summary}</p>
        </div>
    </template>
	<!-- END TEMPLATE ]] -->
</div>
```

Reemplaza el valor *TAG_NAME* por una etiqueta que exista en tu blog y *RESULTS* por un número entero que mostrará la cantidad de resultados a mostrar. Podemos crear tantas secciones como queramos.

> **IMPORTANTE**: BloggerSection no cuenta con estilos por defecto para las secciones, por lo que deberás usar los estilos que te proporciona tu plantilla por defecto o crearlos desde cero.


## Template

El *template* que emplea el plugin es proporcionado por la librería **bloggerUtils** y esta cuenta con algunas de las siguientes variables que te permitirán maquetar el HTML de tus secciones de forma muy rápida, sin tener que modificar prácticamente el JavaScript.

| Variable | Valor devuelto  |
| ------------ | ------------ |
| {title}  | Título de la entrada |
| {summary}  | Resumen de la entrada |
| {url}  | URL de la entrada |
| {image}  | URL de la primera imagen de la entrada |
| {thumbnail}  | URL de la miniatura de la entrada |
| {body}  | Contenido de la entrada |
| {labels}  | Lista de etiquetas de la entrada (se recomienda usar la directiva `loop` para recorrer cada etiqueta individualmente) |

### Etiquetas

Para manipular las etiquetas desde el template, debemos agregar una directiva especial que nos permitirá recorrer todas las etiquetas de cada entrada. Toma como ejemplo el siguiente código:

```html
<div class="labels">
{loop.labels 
<a href="/search/label/@value">@value</a>
/}
</div>
```

El ejemplo anterior imprimirá cada etiqueta de la entrada correspondiente.

#### Excluir etiquetas

Si queremos excluir una o varias etiquetas específicas, podemos usar la función `exclude` de la directiva `loop`. Toma como ejemplo el siguiente código:

```html
<div class="labels">
{loop.labels.(exclude[label1, label2, ...])
<a href="/search/label/@value">@value</a>
/}
</div>
```

El ejemplo anterior excluirá las etiquetas con el nombre `label1`, `label2` y todas las etiquetas que necesitemos que no se muestren.

## Hook/Gancho

Los ganchos te permiten ejecutar código de JavaScript justo después de que se hayan cargado las entradas de cada sección creada. Muy útil para utilizar con librerías de terceros como sliders.

### Modo de uso

Para usar los hooks, debemos ir a nuestro **panel » Tema » Editar HTML** y justo encima de la etiqueta `</body>`, crear una función de la siguiente manera:

```html
<script>
window['hook_name'] = function ( node, params, data ) {
    // Do something here
};
</script>
```

> También es posible agregar la etiqueta anterior directamente en el gadget donde hemos creado la sección, pero en lo personal queda más limpio de esta manera. Puedes hacerlo como mejor te parezca.

Ahora, en la sección donde queremos llamar a este hook, debemos agregar un nuevo atributo al `div` que contiene la clase `.bs-wrapper` de la siguiente manera:

```html
<div class='bs-wrapper' data-hook="hook_name">
    <!-- html... -->
</div>
```

dónde `hook_name` es el nombre de la función que hemos declarado en el paso anterior. Ésta función recibe 3 parametros que son los siguientes:

| Parametro | Explicación  |
| ------------ | ------------ |
| `node`  | Devuelve el nodo html del elemento `.bs-wrapper` |
| `container`  | Devuelve el nodo html del elemento `.bs-container` |
| `config`  | Devuelve un objeto de configuración extraído de los atributos data declarados en el elemento `.bs-wrapper`. Útil si queremos agregar opciones adicionales desde el hook creado |

----------------

## Notas finales

Eso ha sido todo, espero que éste plugin te ayude a mejorar tu experiencia de desarrollo a la hora de crear temas en blogger. Si te ha sido de ayuda éste aporte, considera dejarme tu estrella en el repositorio.  También puedes [invitarme un café](https://ko-fi.com/karasuthemes) para que pueda seguir desarrollando complementos cómo este para blogger en el futuro.