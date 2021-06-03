export function getMethodColor(route) {
    switch (route.method) {
        case 'GET':
          return 'rgb(36 167 76)';
        case 'POST':
          return '#A35F00';
        case 'PUT':
          return '#1F847A';
        case 'DELETE':
          return '#C50A07';
        default:
          return Math.floor(Math.random()*16777215).toString(16);
    }
}