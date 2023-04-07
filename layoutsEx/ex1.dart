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
          children: [
            const Icon(Icons.tag_faces_rounded, size: 50.0, color: Colors.yellow,),
            const Icon(Icons.tag_faces_rounded, size: 50.0, color: Colors.yellow,),
            const Icon(Icons.tag_faces_rounded, size: 50.0, color: Colors.yellow,),
          ],
        ),
      ),
    );
  }
}

