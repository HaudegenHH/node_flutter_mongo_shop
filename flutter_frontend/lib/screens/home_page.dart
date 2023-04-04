import 'package:flutter/material.dart';
import 'package:flutter_frontend/widgets/home_categories_widget.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: ListView(
          children: const [HomeCategoriesWidget()],
        ),
      ),
    );
  }
}
