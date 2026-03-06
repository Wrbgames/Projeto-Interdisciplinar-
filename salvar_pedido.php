<?php
    include("conexao.php");

    $nome = $_POST['nome'];
    $endereco = $_POST['endereco'];
    $pagamento = $_POST['pagamento'];
    $total = $_POST['total'];

    $sql = "INSERT INTO pedidos (nome, endereco, pagamento, total)
            VALUES ('$nome', '$endereco', '$pagamento', '$total')";

    if ($conn->query($sql) === TRUE) {
        echo "Pedido salvo com sucesso!";
        header("Location: cardapio.hmtl");
    } else {
        echo "Erro: " . $conn->error;
    }

    $conn->close();
?>