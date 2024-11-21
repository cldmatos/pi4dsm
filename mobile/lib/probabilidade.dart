import 'package:flutter/material.dart';
import 'dart:math';

class ProbabilityScreen extends StatefulWidget {
  const ProbabilityScreen({super.key});

  @override
  _ProbabilityScreenState createState() => _ProbabilityScreenState();
}

class _ProbabilityScreenState extends State<ProbabilityScreen> {
  final TextEditingController _valueController = TextEditingController();
  double? _probability;

  // Função para calcular a probabilidade de X ser maior que um valor dado
  double calculateProbability(double x, double mean, double stdDev) {
    double z = (x - mean) / stdDev; // Escore Z
    double cdf = cdfNormal(z); // Probabilidade acumulada até Z
    return 1 - cdf; // Complemento: probabilidade de ser maior
  }

  // Função para calcular a CDF de uma distribuição normal
  double cdfNormal(double z) {
    const double pi = 3.141592653589793;
    const double a1 = 0.31938153;
    const double a2 = -0.356563782;
    const double a3 = 1.781477937;
    const double a4 = -1.821255978;
    const double a5 = 1.330274429;

    double t = 1 / (1 + 0.2316419 * z.abs());
    double x = exp(-0.5 * z * z) / sqrt(2 * pi);
    double result = 1 -
        x *
            (a1 * t +
                a2 * t * t +
                a3 * t * t * t +
                a4 * t * t * t * t +
                a5 * t * t * t * t * t);

    return result;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Probabilidade"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "Calcular Probabilidade de X ser maior que um valor",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            TextField(
              controller: _valueController,
              decoration: const InputDecoration(
                labelText: "Insira o valor de X",
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Média e desvio padrão predefinidos
                const double mean = 26.0;
                const double stdDev = 1.2;

                if (_valueController.text.isNotEmpty) {
                  double x = double.parse(_valueController.text);
                  setState(() {
                    _probability = calculateProbability(x, mean, stdDev);
                  });
                }
              },
              child: const Text("Calcular Probabilidade"),
            ),
            const SizedBox(height: 20),
            if (_probability != null)
              Text(
                "Probabilidade de ser maior que X: ${(_probability! * 100).toStringAsFixed(2)}%",
                style:
                    const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
          ],
        ),
      ),
    );
  }
}
