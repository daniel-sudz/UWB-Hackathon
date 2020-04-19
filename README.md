# Firebase Cloud Function
## API End Point
https://us-central1-bboxlabeler.cloudfunctions.net/api
## Data Format

```
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
It should be in jpg
