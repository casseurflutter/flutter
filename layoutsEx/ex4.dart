import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual,
        overlays: [SystemUiOverlay.bottom]);
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: Colors.black,
        body: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              width: 100.0,
              color: Colors.blue,
              child: const Align(
                alignment: Alignment.bottomRight,
                  child: Text('A', style: TextStyle(fontSize: 30.0, color: Colors.white),)),
            ),
            Container(
              width: 100.0,
              color: Colors.red,
              child: const Align(
                alignment: Alignment.center,
                child: Text('B', style: TextStyle(fontSize: 30.0, color: Colors.white),)),
            ),
            Container(
              width: 100.0,
              color: Colors.green,
              child: const Align(
                  alignment: Alignment.topRight,
                  child: Text('C', style: TextStyle(fontSize: 30.0, color: Colors.white),)),
            ),
          ],
        ),
      ),
    );
  }
}

