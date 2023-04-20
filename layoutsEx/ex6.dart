import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(
    const MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'MyApp',
      home: MyLayout(),
    ),
  );
}

class MyLayout extends StatelessWidget {
  const MyLayout({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual, overlays: [SystemUiOverlay.bottom]);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Exemple de layout'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          const SizedBox(height: 20),
          Container(
            color: Colors.blue,
            height: 50,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const <Widget>[
                Text(
                  'Widget 1',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Row(
            children: <Widget>[
              Container(
                color: Colors.red,
                height: 100,
                width: 100,
              ),
              const SizedBox(width: 20),
              Container(
                color: Colors.green,
                height: 100,
                width: 100,
              ),
              const SizedBox(width: 20),
              Container(
                color: Colors.yellow,
                height: 100,
                width: 100,
              ),
            ],
          ),
          const SizedBox(height: 20),
          Container(
            color: Colors.purple,
            height: 50,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const <Widget>[
                Text(
                  'Widget 2',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}



