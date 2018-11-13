# xml-sorter

Simple command line utility for sorting xml content by tag name, attribute name and attribute value.

## Usage and options

You have to pass a source file to the script with valid xml:

```
xml-sorter path/to/file.xml
```

The output will be rendered on the console. If you prefer you can overwrite the source file with the option `-o`.

```
xml-sorter -o path/to/file.xml
```

With options `-t` and `-a` you can customize the ordering of tags and attributes.

```
xml-sorter -t 'firstTag secondTag' -a 'firstAtt secondAtt' path/to/file.xml
```

## Examples

```xml
<!-- file.xml -->
<sorting>
    <tags>
        <b/>
        <c/>
        <a/>
        <x/>
        <z/>
    </tags>
    <attributes>
        <x b="" c="" a="" x="" z=""/>
    </attributes>
    <tagsWithSameName>
        <x c="b" a="c" x="d" z="e"/>
        <x c="c" a="d" x="d" z="a"/>
        <x c="d" a="e" x="d" z="a"/>
        <x c="b" a="c" x="d" z="z"/>
        <x c="g" a="c" x="f" z="e"/>
    </tagsWithSameName>
</sorting>
```

```
xml-sorter -t 'z x' -a 'x z' file.xml

<?xml version="1.0"?>
<sorting>
	<attributes>
		<x x="" z="" a="" b="" c=""/>
	</attributes>
	<tags>
		<z></z>
		<x></x>
		<a></a>
		<b></b>
		<c></c>
	</tags>
	<tagsWithSameName>
		<x x="d" z="a" a="d" c="c"/>
		<x x="d" z="a" a="e" c="d"/>
		<x x="d" z="e" a="c" c="b"/>
```