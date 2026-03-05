import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  	const id = Number(process.argv[2]);

  	if (!id) {
    	console.error("Debes proporcionar un id");
    	process.exit(1);
  	}
  	else if (isNaN(id)) {
    	console.error("El id debe ser un número");
    	process.exit(1);
  	}

  	await prisma.user.delete({
    	where: { id }
  	});

  	console.log(`Usuario ${id} eliminado`);
}

main()
	.catch((error) => {
    	console.error(error);
  	})
  	.finally(async () => {
    	await prisma.$disconnect();
  	});
