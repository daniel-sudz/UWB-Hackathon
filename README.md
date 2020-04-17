## Data Format That I send to your server to get parsed for training

```json
{
  image1: {
    base64: 'base64stringforimage', 
    data: [
    {
      min_x: int,
      max_x: int, 
      min_y: int, 
      max_y: int, 
      label: 'dog'
    }, 
    .... etc
    ]
  }, 
  image2: etc.. 
}
```

### Image Format 
It should be in jpg but maybe not, I need to figure that out. I think firebase accepts a zip files, so you will need to convert the base 64 to a file and zip everything up in the way it wants.
